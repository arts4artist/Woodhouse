import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  {
    name: 'servers_in',
    description: 'Devs only command!',
    type: 1
  },
  {
    name: 'level_',
    description: 'Get level up',
    type: 1
  },
  {
    name: 'me',
    description: 'Do something',
    type: 1
  }
];

const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APPLICATION_ID}/commands`;

const res = await fetch(url, {
  method: 'PUT',
  headers: {
    'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(commands)
});

console.log('Slash commands registered:', await res.json());