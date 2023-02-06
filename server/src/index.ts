import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from './models/Deck';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { getDecksController } from './controllers/getDecksController';
import { createNewCardController } from './controllers/createNewCardController';
import { getSingleDeckController } from './controllers/getSingleDeckController';
import { deleteCardController } from './controllers/deleteCardController';

config();
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks', getDecksController);
app.get('/decks/:deckId', getSingleDeckController);
app.post('/decks/:deckId/card', createNewCardController);
app.delete('/decks/:deckId/cards/:cardIndex', deleteCardController);

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
