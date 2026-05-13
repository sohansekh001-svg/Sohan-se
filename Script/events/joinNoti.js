module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "2.0.0",
  credits: "𝑺𝒐𝒉𝒂𝒏 𝑨𝒉𝒎𝒆𝒅",
  description: "Ultra stylish welcome message with auto delete",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = require("path");

  const { threadID, logMessageData } = event;
  const botPrefix = global.config.PREFIX || "/";
  const botName = global.config.BOTNAME || "𝗦𝗵𝗮𝗵𝗮𝗱𝗮𝘁 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁";

  const addedUsers = logMessageData.addedParticipants;

  // 🧠 detect bot add
  if (addedUsers.some(i => i.userFbId == api.getCurrentUserID())) {

    await api.changeNickname(
      `🌸 ${botPrefix} • ${botName}`,
      threadID,
      api.getCurrentUserID()
    );

    const botMsg = `
🌸══════════════════════🌸
        🤖 𝗕𝗢𝗧 𝗝𝗢𝗜𝗡𝗘𝗗
🌸══════════════════════🌸

✨ ধন্যবাদ আমাকে যোগ করার জন্য!
🌺 এখন থেকে আমি তোমাদের সাথে আছি

⚡ Commands:
➤ ${botPrefix}help
➤ ${botPrefix}info
➤ ${botPrefix}admin

💌 Contact:
🔗 m.me/100001039692046
📱 wa.me/100001039692046

🌸══════════════════════🌸
   🤖 ${botName}
🌸══════════════════════🌸
`;

    const msg = await api.sendMessage(botMsg, threadID);

    // ⏳ auto delete after 1 minute
    setTimeout(() => {
      api.unsendMessage(msg.messageID);
    }, 60000);

    return;
  }

  try {
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};

    let mentions = [];
    let nameList = [];

    for (let user of addedUsers) {
      nameList.push(user.fullName);
      mentions.push({
        tag: user.fullName,
        id: user.userFbId
      });
    }

    const names = nameList.join(", ");

    const msg = `
🌸━━━━━━━━━━━━━━━━━━━━🌸
        💐 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗖𝗔𝗥𝗗
🌸━━━━━━━━━━━━━━━━━━━━🌸

✨ হ্যালো ${names}
🌷 তোমাকে স্বাগতম এই গ্রুপে!

🌺 এখানে ভালোবাসা, বন্ধুত্ব আর হাসি-মজা থাকবে
🌼 সবাইকে সম্মান করে চলবে

━━━━━━━━━━━━━━━━━━━━
💠 গ্রুপ: ${threadName}
💠 সদস্য সংখ্যা: ${participantIDs.length}

🌸━━━━━━━━━━━━━━━━━━━━🌸
   ⚡ 𝗗𝗜𝗚𝗜𝗧𝗔𝗟 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ⚡
🌸━━━━━━━━━━━━━━━━━━━━🌸
`;

    const joinPath = path.join(__dirname, "cache", "joinGif");
    const files = fs.existsSync(joinPath) ? fs.readdirSync(joinPath) : [];

    const randomFile = files.length
      ? fs.createReadStream(path.join(joinPath, files[Math.floor(Math.random() * files.length)]))
      : null;

    const sent = await api.sendMessage(
      randomFile
        ? { body: msg, attachment: randomFile, mentions }
        : { body: msg, mentions },
      threadID
    );

    // ⏳ auto delete after 1 minute
    setTimeout(() => {
      api.unsendMessage(sent.messageID);
    }, 60000);

  } catch (err) {
    console.log(err);
  }
};
