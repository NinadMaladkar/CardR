import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
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

const port = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => {
    console.log('Connected to Distribution API Database - Initial Connection');
    app.listen(port, () => {
      `Connected to - ${port}`;
    });
  })
  .catch((err) => {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  });
