const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "antibad",
  eventType: ["message"],
  version: "1.0.0",
  credits: "𝑺𝒐𝒉𝒂𝒏 𝑨𝒉𝒎𝒆𝒅",
  description: "Auto 2 warning + 3rd kick system"
};

// 📁 storage file
const dataFile = path.join(__dirname, "../../cache/antibad.json");

// 🚫 bad words list (add more if you want)
const badWords = [
  "fuck",
  "fuckyou",
  "chod",
  "chudi",
  "madarchod",
  "banchod",
  "haramzada",
  "bal",
  "baler",
  "chodu"
];

// 📥 load data
function loadData() {
  try {
    if (!fs.existsSync(dataFile)) return {};
    return JSON.parse(fs.readFileSync(dataFile));
  } catch (e) {
    return {};
  }
}

// 💾 save data
function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

module.exports.run = async function ({ api, event }) {
  const { threadID, senderID, body, messageID } = event;

  if (!body) return;

  const text = body.toLowerCase();

  // check bad word
  const isBad = badWords.some(word => text.includes(word));
  if (!isBad) return;

  let data = loadData();

  if (!data[threadID]) data[threadID] = {};
  if (!data[threadID][senderID]) data[threadID][senderID] = 0;

  data[threadID][senderID] += 1;
  saveData(data);

  const count = data[threadID][senderID];

  // ⚠️ WARNING 1
  if (count === 1) {
    return api.sendMessage(
`⚠️ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 1

🚫 বাজে ভাষা ব্যবহার করবেন না
⚡ এটা গ্রুপ রুলস ভাঙছে`,
    threadID,
    messageID
    );
  }

  // ⚠️ WARNING 2
  if (count === 2) {
    return api.sendMessage(
`⚠️ 𝗙𝗜𝗡𝗔𝗟 𝗪𝗔𝗥𝗡𝗜𝗡𝗚

🚫 আবার করলে আপনাকে গ্রুপ থেকে রিমুভ করা হবে
📛 দয়া করে ভালো ব্যবহার করুন`,
    threadID,
    messageID
    );
  }

  // ⛔ KICK USER
  if (count >= 3) {
    try {
      await api.removeUserFromGroup(senderID, threadID);

      return api.sendMessage(
`⛔ 𝗔𝗖𝗧𝗜𝗢𝗡 𝗧𝗔𝗞𝗘𝗡

🚫 ব্যবহারকারী গ্রুপ থেকে রিমুভ করা হয়েছে
📛 কারণ: বারবার বাজে ভাষা ব্যবহার`,
      threadID
      );
    } catch (err) {
      console.log(err);
    }
  }
};
