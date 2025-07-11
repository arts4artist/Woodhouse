import { verifySignature } from '../utils/verify.js';
import { InteractionType, InteractionResponseType } from 'discord-interactions';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const rawBody = await getRawBody(req);
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];

  const isValid = verifySignature(signature, timestamp, rawBody.toString(), process.env.DISCORD_PUBLIC_KEY);

  if (!isValid) return res.status(401).send('Bad request signature');

  const json = JSON.parse(rawBody);

  if (json.type === InteractionType.PING) {
    return res.status(200).json({ type: InteractionResponseType.PONG });
  }

  if (json.type === InteractionType.APPLICATION_COMMAND) {
    const cmd = json.data.name;
    let content = 'Command not found';

    switch (cmd) {
      case 'servers_in':
        content = 'This is a dev-only command!';
        break;
      case 'level_':
        content = 'You leveled up! 🎉';
        break;
      case 'me':
        content = 'You did something!';
        break;
    }

    return res.status(200).json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content }
    });
  }

  return res.status(400).send('Unhandled interaction type');
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
