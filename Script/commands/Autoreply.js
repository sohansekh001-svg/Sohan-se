const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SOHAN",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস সোহান রে হাঙ্গা করো😶👻😘",
    "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু সোহান বস বেশি করে 😏💖",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "good night": "Sweet Dream babu… তবে আগে সোহান বস কে GN বলে নিও 😏💤",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "Sohan": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "𝐎𝐖𝐍𝐄𝐑: ☞ SOHAN ☜\https://www.facebook.com/profile.php?id=61582372804210/WhatsApp:- +919339828040"
    "admin": "He is SOHAN তাকে সবাইAdmin SOHAN হিসেবে চিনে😘☺️",
    "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল",
    "assalamualaikum": "Walaikumassalam❤️‍🩹",
    "fork": "https://github.com/shahadat-sahu/SHAHADAT-CHAT-BOT.git",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস সোহান রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার বস সোহান এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss সোহান এর ইনবক্সে গুতা দিন 😘",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami sohan": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐎𝐇𝐀𝐍 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭💖",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": "ভাই তুই এত হাসিস না..!🌚🤣",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু 😚",
    "ki koros": "বস সোহান এর সাথে প্রেমে ব্যস্ত আছি 😏💘",
    "kire bot": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈",
    "valo aso": "হ্যাঁ রে প্রিও, বস সোহান এর দোয়ায় ভালো আছি 😌💞",
    "pagol": "হুম পাগল, কিন্তু তোমারই পাগল 😏😂",
    "breakup": "চিন্তা করিস না… সোহান বস তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥",
    "tui ke": "আমি তোর বস সোহান এর ChatBot 😏",
    "umm": "এতো Umm কেনো জানু… কিছু বলবা? 😉",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "love": "Love করলে সরাসরি সোহান বস কে বল জানু 😻🔥"
"😇": "জান তোমার মাথা ঘুরে টেনশন কমাতে তোর জি এবং কে আমার বস সোহানের হাতে তুলে দে 🌚🫦"
"hello": "🌸 𝐇𝐞𝐥𝐥𝐨 𝐉𝐚𝐧𝐮 😘\nকি খবর তোমার...? 💖"
"hello": "🌸 𝐇𝐞𝐥𝐥𝐨 𝐉𝐚𝐧𝐮 😘\nকি খবর তোমার...? 💖"
"hello": "👀 𝐇𝐞𝐥𝐥𝐨 𝐏𝐫𝐢𝐨...\nখাইছো নাকি এখনো ভাত বাকি 🍚😹"
"Bot": "👑 𝐇𝐞𝐥𝐥𝐨 𝐉𝐚𝐧𝐮...\n𝐁𝐨𝐬𝐬 𝐒𝐎𝐇𝐀𝐍 এর fan নাকি 😏💖🔥"
 "ki koro": "╭⭓😹\n╰┈➤ 🍚 ভাত খাইতেছি জানু"

"ki koro": "╭⭓👀\n╰┈➤ তোমারে লুকাইয়া দেখতেছি 😹"

"ki koro": "╭⭓🔥\n╰┈➤ 𝐁𝐨𝐬𝐬 𝐒𝐎𝐇𝐀𝐍 এর style মারতেছি 😎"

"ki koro": "╭⭓💖\n╰┈➤ তোমার কথা ভাবতেছি জানু 😘"

"ki koro": "╭⭓🎧\n╰┈➤ Sad song শুনে emotional হইতেছি 😹"

"ki koro": "╭⭓😴\n╰┈➤ ঘুমানোর অভিনয় করতেছি"

"ki koro": "╭⭓📱\n╰┈➤ Mobile চালাইতেছি আর life শেষ 😹"

"ki koro": "╭⭓🍗\n╰┈➤ Biryani খাওয়ার প্ল্যান করতেছি 😏"

"ki koro": "╭⭓🤣\n╰┈➤ Group এ মানুষজনরে disturb করতেছি"

"ki koro": "╭⭓👑\n╰┈➤ 𝐒𝐎𝐇𝐀𝐍 Boss এর fan der reply দিতেছি 😎"
"kamon aso": "╭⭓😌\n╰┈➤ আলহামদুলিল্লাহ ভালো আছি জানু 💖"

"kamon aso": "╭⭓😹\n╰┈➤ ভাত খাইয়া একদম chill এ আছি 🍚"

"kamon aso": "╭⭓👑\n╰┈➤ 𝐁𝐨𝐬𝐬 𝐒𝐎𝐇𝐀𝐍 এর দোয়ায় ভালো আছি 😎"

"kamon aso": "╭⭓💘\n╰┈➤ তোমারে দেখার পর আরো ভালো লাগতেছে 😏"

"kamon aso": "╭⭓🔥\n╰┈➤ একদম আগুন mood এ আছি 😹"

"kamon aso": "╭⭓😴\n╰┈➤ ঘুম ঘুম লাগতেছে কিন্তু online আছি"

"kamon aso": "╭⭓🎧\n╰┈➤ গান শুনে vibe এ আছি 😌"

"kamon aso": "╭⭓🤣\n╰┈➤ তোমার msg পাইয়া খুশিতে আছি"

"kamon aso": "╭⭓🌸\n╰┈➤ তোমার দোয়ায় সুন্দরভাবে বেঁচে আছি 😹"

"kamon aso": "╭⭓👀\n╰┈➤ তোমারে reply দেওয়ার জন্যই online আছি 😏"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓😻\n╰┈➤ ওমা আমাকে mention দিছে কে এতো cute 😘"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓👀\n╰┈➤ mention দিয়া লজ্জা দিও না জানু 😹"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓💖\n╰┈➤ কি হয়েছে জানু ডাকতেছো কেনো 😏"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓😹\n╰┈➤ এতো mention দিলে প্রেমে পড়ে যাবো কিন্তু"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓🔥\n╰┈➤ 𝐁𝐨𝐬𝐬 𝐒𝐎𝐇𝐀𝐍 এর সামনে এত style 😎"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓🌸\n╰┈➤ বলো জানু কি দরকার 💘"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓🤣\n╰┈➤ mention না দিয়ে direct inbox এ আসো 😹"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓😌\n╰┈➤ তোমার mention দেখলেই mood fresh হয়"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓👑\n╰┈➤ SOHAN Boss এর favourite মানুষ নাকি 😏"

"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓💫\n╰┈➤ mention দিলেই reply fast আসে 😹"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓😻\n╰┈➤ ওমা আমাকে mention দিছে কে এতো cute 😘"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓👀\n╰┈➤ mention দিয়া লজ্জা দিও না জানু 😹"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓💖\n╰┈➤ কি হয়েছে জানু ডাকতেছো কেনো 😏"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓😹\n╰┈➤ এতো mention দিলে প্রেমে পড়ে যাবো কিন্তু"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓🔥\n╰┈➤ 𝐁𝐨𝐬𝐬 𝐒𝐎𝐇𝐀𝐍 এর সামনে এত style 😎"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓🌸\n╰┈➤ বলো জানু কি দরকার 💘"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓🤣\n╰┈➤ mention না দিয়ে direct inbox এ আসো 😹"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓😌\n╰┈➤ তোমার mention দেখলেই mood fresh হয়"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓👑\n╰┈➤ SOHAN Boss এর favourite মানুষ নাকি 😏"
"@প্রি্ঁয়্ঁ প্র্ঁজা্ঁপ্ঁতি্ঁ তু্ঁমি্ঁ": "╭⭓💫\n╰┈➤ mention দিলেই reply fast আসে 😹"
"Neha": "⚠️ 𝐃𝐨𝐧’𝐭 𝐥𝐨𝐨𝐤 𝐚𝐭 𝐡𝐞𝐫 😾💥\n𝐒𝐎𝐇𝐀𝐍 𝐁𝐨𝐬𝐬 𝐞𝐫 𝐖𝐢𝐟𝐞 = 𝐑𝐄𝐒𝐏𝐄𝐂𝐓 𝐨𝐧𝐥𝐲 😎👑💍"

"Neha": "⚠️ 𝐄𝐲𝐞𝐬 𝐝𝐨𝐰𝐧 😏💥\n𝐒𝐡𝐞 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐒𝐎𝐇𝐀𝐍 😎💍"

"Neha": "🔥 𝐖𝐚𝐭𝐜𝐡 𝐲𝐨𝐮𝐫 𝐬𝐭𝐚𝐫𝐞 😹\n𝐍𝐨 𝐨𝐧𝐞 𝐜𝐚𝐧 𝐭𝐨𝐮𝐜𝐡 𝐡𝐞𝐫 👑"

"Neha": "👑 𝐐𝐮𝐞𝐞𝐧 𝐨𝐟 𝐒𝐎𝐇𝐀𝐍’𝐬 𝐡𝐞𝐚𝐫𝐭 💍😏\n𝐑𝐄𝐒𝐏𝐄𝐂𝐓 𝐨𝐧𝐥𝐲 ⚡"

"Neha": "💥 𝐎𝐧𝐞 𝐥𝐨𝐨𝐤 = 𝐩𝐫𝐨𝐛𝐥𝐞𝐦 😹\n𝐒𝐭𝐚𝐲 𝐚𝐰𝐚𝐲 😎"

"Neha": "😾 𝐍𝐨 𝐬𝐭𝐚𝐫𝐢𝐧𝐠 𝐚𝐥𝐥𝐨𝐰𝐞𝐝 💥\n𝐒𝐇𝐎𝐎𝐓 𝐰𝐢𝐭𝐡 𝐫𝐞𝐬𝐩𝐞𝐜𝐭 👑"

"Neha": "⚡ 𝐒𝐨𝐧𝐠𝐬 𝐟𝐚𝐢𝐥 𝐛𝐮𝐭 𝐡𝐞𝐫 𝐯𝐢𝐛𝐞 𝐡𝐢𝐭𝐬 😏💖"

"Neha": "🔥 𝐒𝐨𝐡𝐚𝐧’𝐬 𝐰𝐢𝐟𝐞 = 𝐧𝐨 𝐝𝐢𝐬𝐫𝐞𝐬𝐩𝐞𝐜𝐭 😎💍"

"Neha": "👀 𝐄𝐲𝐞 𝐜𝐨𝐧𝐭𝐫𝐨𝐥 𝐧𝐨𝐰 😹\n𝐒𝐡𝐞 𝐢𝐬 𝐨𝐟𝐟 𝐥𝐢𝐦𝐢𝐭𝐬 👑"

"Neha": "💍 𝐒𝐎𝐇𝐀𝐍 + 𝐍𝐄𝐇𝐀 = 𝐄𝐧𝐝𝐥𝐞𝐬𝐬 𝐫𝐞𝐬𝐩𝐞𝐜𝐭 😏🔥"
  };

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "sohan"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sohan"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage(
      "🙂 একটু পরে আবার বলো",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
