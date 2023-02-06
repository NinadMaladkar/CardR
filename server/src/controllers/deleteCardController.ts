import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from '../models/Deck';

export const deleteCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const cardIndex = req.params.cardIndex;
  const deck = await DeckModel.findById(deckId);

  if (!deck) return res.status(400).send('No Deck found.');

  deck.cards.splice(parseInt(cardIndex), 1);
  await deck.save();

  res.json(deck);
};
