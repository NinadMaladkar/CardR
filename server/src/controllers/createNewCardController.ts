import express, { Request, Response } from 'express';

import DeckModel from '../models/Deck';

export const createNewCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);

  if (!deck) return res.status(400).send('No Deck found!');

  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();

  res.json(deck);
};
