module.exports.config = {
  name: "antilink",
  eventType: ["message"],
  version: "2.0.0",
  credits: "ChatGPT",
  description: "Auto warn & kick for links",
  dependencies: {}
};

module.exports.run = async function () {};

module.exports.handleEvent = async function ({ api, event, Users, Threads }) {
  try {
    const { threadID, messageID, senderID, body } = event;

    if (!body) return;

    // ===== LINK CHECK =====
    const linkRegex =
      /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(facebook\.com\/[^\s]+)|(fb\.watch\/[^\s]+)/gi;

    if (!linkRegex.test(body)) return;

    // ===== BOT INFO =====
    const botID = api.getCurrentUserID();

    // ===== THREAD INFO =====
    const threadInfo = await api.getThreadInfo(threadID);

    // ===== BOT ADMIN CHECK =====
    const botAdmin = threadInfo.adminIDs.some(
      (item) => item.id == botID
    );

    if (!botAdmin) return;

    // ===== USER ADMIN CHECK =====
    const isAdmin = threadInfo.adminIDs.some(
      (item) => item.id == senderID
    );

    // ===== USER NAME =====
    const name = await Users.getNameUser(senderID);

    // ===== WARNING FRAME =====
    const warn =
`╭━━〔 ⚠️ ANTI LINK SYSTEM ⚠️ 〕━━╮
┃ 👤 Name : ${name}
┃ 🆔 UID : ${senderID}
┃
┃ ❌ গ্রুপে লিংক দেওয়া নিষিদ্ধ!
┃ ⏳ ৫ সেকেন্ডের মধ্যে লিংক রিমুভ করুন।
┃ 🚫 না করলে আপনাকে গ্রুপ থেকে রিমুভ করা হবে।
┃
┃ 🤖 Mira Protection System
╰━━━━━━━━━━━━━━━━━━╯`;

    await api.sendMessage(warn, threadID, messageID);

    // ===== WAIT 5 SECONDS =====
    setTimeout(async () => {
      try {
        const newInfo = await api.getThreadHistory(threadID, 15);

        // ===== CHECK MESSAGE STILL EXISTS =====
        const stillExists = newInfo.some(
          (msg) =>
            msg.senderID == senderID &&
            msg.body &&
            msg.body.includes(body)
        );

        // ===== IF LINK REMOVED =====
        if (!stillExists) {
          return api.sendMessage(
`╭━━〔 ✅ LINK REMOVED 〕━━╮
┃ 👤 ${name}
┃
┃ ✅ লিংক রিমুভ করা হয়েছে।
┃ 🎉 আপনাকে কিক দেওয়া হয়নি।
┃
┃ 🤖 Mira Security
╰━━━━━━━━━━━━━━╯`,
            threadID
          );
        }

        // ===== IF USER IS ADMIN =====
        if (isAdmin) {
          return api.sendMessage(
`╭━━〔 ⚠️ ADMIN WARNING ⚠️ 〕━━╮
┃ 👑 ${name}
┃
┃ ❌ আপনি এডমিন হওয়ায়
┃ আপনাকে রিমুভ করা হয়নি।
┃ ⚠️ ভবিষ্যতে লিংক দিবেন না।
┃
┃ 🤖 Mira Protection
╰━━━━━━━━━━━━━━━━╯`,
            threadID
          );
        }

        // ===== REMOVE USER =====
        await api.removeUserFromGroup(senderID, threadID);

        api.sendMessage(
`╭━━〔 🚫 USER REMOVED 🚫 〕━━╮
┃ 👤 Name : ${name}
┃ 🆔 UID : ${senderID}
┃
┃ ❌ ৫ সেকেন্ডের মধ্যে
┃ লিংক রিমুভ না করায়
┃ তাকে গ্রুপ থেকে রিমুভ করা হয়েছে।
┃
┃ 🤖 Mira AntiLink System
╰━━━━━━━━━━━━━━━━━━╯`,
          threadID
        );

      } catch (e) {
        console.log(e);
      }
    }, 5000);

  } catch (err) {
    console.log(err);
  }
};
