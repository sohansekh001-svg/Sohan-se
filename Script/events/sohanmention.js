module.exports.config = {
  name: "sohanmention",
  eventType: ["message"],
  version: "3.0.0",
  credits: "𝑺𝒐𝒉𝒂𝒏 𝑨𝒉𝒎𝒆𝒅",
  description: "Random stylish auto reply system"
};

module.exports.run = async function ({ api, event }) {

  const { threadID, body } = event;

  if (!body) return;

  const trigger = "প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ";

  if (body.toLowerCase().includes(trigger.toLowerCase())) {

    // 🔥 Random Replies
    const replies = [

`╔══❖•🔥•❖══╗
😎 এই! সোহান বসরে মেনশন
করা সহজ না রে বেটা 😏
📛 লাইসেন্স লাগে 🔥
╚══❖•🔥•❖══╝`,

`🌸 ওহো! 😹
সোহান বসের নাম নিচ্ছিস?
⚡ আগে permission নে বেটা 🔥`,

`👑 Boss Alert 👑

😎 সোহান বসকে ডাকতে
VIP Access লাগে রে ভাই 🔥`,

`⚔️ Warning ⚔️

📛 বসের নাম বেশি নিবি না 😹
System গরম হয়ে যাবে 🔥`,

`╭────────────⭓
😈 সোহান বস online আছে
সাবধানে কথা বল 😎
╰────────────⭓`,

`💀 আরে বেটা!
সোহান বসের নাম নিলে
respect সহ নিতে হয় 🔥👑`

    ];

    // 🎲 Random Message
    const randomMsg = replies[Math.floor(Math.random() * replies.length)];

    return api.sendMessage(randomMsg, threadID);
  }
};
