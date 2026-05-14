module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Sohan Sekh + ChatGPT",
  description: "Anti leave system with voice + stylish message"
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  try {
    const data = (await Threads.getData(event.threadID)).data || {};

    if (data.antiout === false) return;

    const leftID = event.logMessageData?.leftParticipantFbId;
    if (!leftID) return;

    if (leftID === api.getCurrentUserID()) return;

    const name =
      global.data.userName.get(leftID) ||
      await Users.getNameUser(leftID);

    // শুধু self-leave ধরবে
    if (event.author !== leftID) return;

    const msg = `╭─━━━━━━━━━━━━━━━─╮
  ⚠️ 𝐀𝐍𝐓𝐈 𝐎𝐔𝐓 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃
╰─━━━━━━━━━━━━━━━─╯

👤 ইউজার: ${name}

😎 এই গ্রুপটা সহজ না!
❌ পারমিশন ছাড়া কেউ leave করতে পারবে না

🔄 তোমাকে আবার গ্রুপে add করা হলো
💀 Next time careful থাকো boss!`;

    // 🎧 Voice (Google TTS)
    const voice = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=bn&q=${encodeURIComponent(
      `${name} তুমি এই গ্রুপ থেকে যেতে পারবে না। তোমাকে আবার যুক্ত করা হলো।`
    )}`;

    // আবার add করবে
    api.addUserToGroup(leftID, event.threadID, (err) => {
      if (err) {
        return api.sendMessage(
          `❌ ${name} কে আবার add করা গেল না।
সম্ভবত privacy বা block issue আছে।`,
          event.threadID
        );
      }

      api.sendMessage(
        {
          body: msg,
          attachment: await global.utils.getStreamFromURL(voice)
        },
        event.threadID
      );
    });

  } catch (e) {
    console.log("Antiout error:", e);
  }
};
