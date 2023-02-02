import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from './models/Deck';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
  });
  const result = await newDeck.save();

  res.json(result);
});

app.get('/decks', async (req: Request, res: Response) => {
  const allDecks = await DeckModel.find();

  console.log(allDecks);

  res.json(allDecks);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello There');
});

console.log(process.env.MONGO_URL);

const PORT = 5000;
const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
