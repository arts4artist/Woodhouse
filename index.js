import express from 'express';
import { config } from 'dotenv';
import interactions from './api/interactions.js';

config();

const app = express();
app.use(express.json({ verify: () => {} }));
app.post('/api/interactions', interactions);
app.get('/', (req, res) => res.send('Bot running locally!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Bot running at http://localhost:${PORT}`));