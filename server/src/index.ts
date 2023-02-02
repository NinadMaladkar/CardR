import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from './models/Deck';

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

const db = mongoose.connect(
  'mongodb+srv://ninad:KL2i9ETZgJOZ5rkz@cluster0.01khfam.mongodb.net/?retryWrites=true&w=majority'
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
