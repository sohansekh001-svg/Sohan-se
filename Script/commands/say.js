module.exports.config = {
  name: "say",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃",
  description: "Text + Original Voice Reply",
  commandCategory: "media",
  usages: "[text]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "path": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  try {

    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];

    let text =
      event.type == "message_reply"
        ? event.messageReply.body
        : args.join(" ");

    if (!text)
      return api.sendMessage(
        "⚠️ কিছু লিখে দাও!\n\nExample:\n/say Hello Boss 😎",
        event.threadID,
        event.messageID
      );

    const filePath = path.resolve(
      __dirname,
      "cache",
      `${event.threadID}_${event.senderID}.mp3`
    );

    const url =
      "https://translate.google.com/translate_tts?ie=UTF-8&q=" +
      encodeURIComponent(text) +
      "&tl=bn&client=tw-ob";

    await global.utils.downloadFile(url, filePath);

    return api.sendMessage(
      {
        body: `╭─❍\n│ 🗣️ 𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 𝐕𝐎𝐈𝐂𝐄\n│\n│ 💬 ${text}\n╰───────────⨳`,
        attachment: fs.createReadStream(filePath)
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );

  } catch (e) {
    console.log(e);

    return api.sendMessage(
      "❌ Voice তৈরি করতে সমস্যা হয়েছে!",
      event.threadID,
      event.messageID
    );
  }
};
