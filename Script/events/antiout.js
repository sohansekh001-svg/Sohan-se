const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";
const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "baby",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ULLASH",
  description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
  commandCategory: "Chat",
  usages: "[message/query]",
  cooldowns: 0,
  prefix: true
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const uid = event.senderID;
    const senderName = await Users.getNameUser(uid);
    const rawQuery = args.join(" ");
    const query = rawQuery.toLowerCase();
    const simsim = await getMainAPI();

    if (!query) {
      const ran = ["Bolo baby", "hum"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(r, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply = global.client.handleReply || [];
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "simsimi"
          });
        }
      });
    }

    const command = args[0].toLowerCase();

    if (["remove", "rm"].includes(command)) {
      const parts = rawQuery.replace(/^(remove|rm)\s*/i, "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage("Use: remove [Question] - [Reply]", event.threadID, event.messageID);

      const [ask, ans] = parts.map(p => p.trim());
      const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (command === "list") {
      const res = await axios.get(`${simsim}/list`);
      if (res.data.code === 200) {
        return api.sendMessage(
          `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\nDeveloper: ${res.data.author}`,
          event.threadID,
          event.messageID
        );
      }
      return api.sendMessage(`Error: ${res.data.message}`, event.threadID, event.messageID);
    }

    if (command === "edit") {
      const parts = rawQuery.replace(/^edit\s*/i, "").split(" - ");
      if (parts.length < 3)
        return api.sendMessage("Use: edit [Q] - [Old] - [New]", event.threadID, event.messageID);

      const [ask, oldReply, newReply] = parts.map(p => p.trim());
      const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (command === "teach") {
      const parts = rawQuery.replace(/^teach\s*/i, "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage("Use: teach [Q] - [Reply]", event.threadID, event.messageID);

      const [ask, ans] = parts.map(p => p.trim());
      const groupID = event.threadID;
      let groupName = "";

      try {
        if (groupID != uid) {
          const threadInfo = await api.getThreadInfo(groupID);
          groupName = threadInfo?.threadName || "";
        }
      } catch {}

      let teachUrl = `${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}&groupID=${encodeURIComponent(groupID)}`;
      if (groupName) teachUrl += `&groupName=${encodeURIComponent(groupName)}`;

      const res = await axios.get(teachUrl);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
    const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

    for (const rep of replies) {
      await new Promise(resolve => {
        api.sendMessage(rep, event.threadID, (err, info) => {
          if (!err) {
            global.client.handleReply = global.client.handleReply || [];
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: "simsimi"
            });
          }
          resolve();
        }, event.messageID);
      });
    }

  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, Users }) {
  try {
    const senderName = await Users.getNameUser(event.senderID);
    const replyText = event.body ? event.body.toLowerCase() : "";
    if (!replyText) return;

    const simsim = await getMainAPI();

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
    const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

    for (const rep of replies) {
      await new Promise(resolve => {
        api.sendMessage(rep, event.threadID, (err, info) => {
          if (!err) {
            global.client.handleReply = global.client.handleReply || [];
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: "simsimi"
            });
          }
          resolve();
        }, event.messageID);
      });
    }

  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    const raw = event.body ? event.body.toLowerCase().trim() : "";
    if (!raw) return;

    const senderName = await Users.getNameUser(event.senderID);
    const senderID = event.senderID;
    const simsim = await getMainAPI();

    const greetings = [
      "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
      "শুনবো না😼 তুমি আমার বস সোহান কে প্রেম করাই দাও নাই🥺পচা তুমি🥺",
      "আমি আবাল দের সাথে কথা বলি না,ok😒",
      "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
      "Bolo Babu, তুমি কি আমার বস সোহান কে ভালোবাসো? 🙈💋",
      "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑",
      "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?",
      "এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬",
      "I love you janu🥰",
      "আরে Bolo আমার জান ,কেমন আছো?😚",
      "Hop beda😾, Boss বল boss😼",
      "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু",
      "আমাকে ডাকলে আমি কিস করে দিবো😘",
      "হ্যাঁ জানু আসো😘",
      "দূরে যা 😏",
      "তোর কথা কেউ শুনে না 😂",
      "আমি বিজি আছি😒",
      "হুম বলো কি বলবে😒",
      "বলো জানু 🌚",
      "সোহান আমর বস 🫦😍",
      "Sohan Amar Boss Love You Good Boy 🥵🌺"
    ];

    if (
      raw === "baby" || raw === "bot" || raw === "bby" ||
      raw === "jan" || raw === "xan" || raw === "জান" ||
      raw === "বট" || raw === "বেবি"
    ) {
      const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
      return api.sendMessage(randomReply, event.threadID);
    }

    if (
      raw.startsWith("baby ") || raw.startsWith("bot ") || raw.startsWith("bby ") ||
      raw.startsWith("jan ") || raw.startsWith("xan ") ||
      raw.startsWith("জান ") || raw.startsWith("বট ") || raw.startsWith("বেবি ")
    ) {
      const query = raw.replace(/^baby\s+|^bot\s+|^bby\s+|^jan\s+|^xan\s+|^জান\s+|^বট\s+|^বেবি\s+/i, "").trim();
      if (!query) return;

      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

      for (const rep of replies) {
        await new Promise(resolve => {
          api.sendMessage(rep, event.threadID, () => resolve());
        });
      }
    }

  } catch {}
};
