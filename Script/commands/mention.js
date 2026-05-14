module.exports.config = {
 name: "mention",
 version: "2.0.0",
 hasPermssion: 2,
 credits: "𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃",
 description: "বারবার কাউকে মেনশন করার কমান্ড",
 commandCategory: "group",
 usages: "/mention @mention [count]",
 cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 const { mentions, threadID } = event;

 if (Object.keys(mentions).length === 0) {
 return api.sendMessage(
`╭─❍
│ ⚠️ কাউকে মেনশন করো আগে!
│
│ 📌 Example:
│ /mention @user 10
╰───────────⨳`,
 threadID
 );
 }

 const mentionID = Object.keys(mentions)[0];
 const mentionName = mentions[mentionID];

 let count = parseInt(args[args.length - 1]);
 const repeatCount = isNaN(count) ? 1 : Math.min(count, 100);

 const lines = [
 "ঘরে ঘরে 𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 😎🔥",
 "এই যে বের হও চিপা থেকে 🐸🔪",
 "𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 ডাকছে 😹",
 "এতো লুকাইলে লাভ নাই 👀",
 "Boss online আছে 😎🤙",
 "𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 এর সামনে শান্ত হও 😌",
 "বারবার মেনশন খাইতেছো 😂",
 "গ্রুপ কাঁপাইতেছে 𝐒𝐎𝐇𝐀𝐍 😈🔥",
 "এই নাও আবার মেনশন 😹",
 "ঘরে ঘরে 𝐒𝐎𝐇𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 🤍"
 ];

 for (let i = 0; i < repeatCount; i++) {
 try {

 const randomLine = lines[Math.floor(Math.random() * lines.length)];

 await api.sendMessage({
 body: `╭─❍\n│ ${mentionName}\n│\n│ ${randomLine}\n╰───────────⨳`,
 mentions: [{
 tag: mentionName,
 id: mentionID
 }]
 }, threadID);

 if (i < repeatCount - 1) {
 await new Promise(resolve => setTimeout(resolve, 1000));
 }

 } catch (error) {
 console.error("মেনশন পাঠাতে সমস্যা:", error);
 break;
 }
 }
};
