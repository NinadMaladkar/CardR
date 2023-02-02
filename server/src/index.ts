import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from './models/Deck';
import { config } from 'dotenv';

const app = express();

app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
  });
  const result = await newDeck.save();

  res.json(result);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello There');
});

const PORT = 5000;
const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
