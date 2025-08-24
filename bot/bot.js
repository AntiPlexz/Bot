const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const API_URL = process.env.API_URL;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => console.log(`Logged in as ${client.user.tag}`));

client.on('messageCreate', async message => {
  if (message.channel.id !== CHANNEL_ID) return;
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!newkey") {
    try {
      const res = await fetch(API_URL + "/generate", {
        method: "POST",
        headers: { "Authorization": ADMIN_TOKEN }
      });
      const data = await res.json();
      if (data.success) message.reply("✅ New key generated! Check the channel.");
      else message.reply("❌ Failed to generate key.");
    } catch (err) {
      console.error(err);
      message.reply("❌ Error contacting API.");
    }
  }
});

client.login(BOT_TOKEN);
