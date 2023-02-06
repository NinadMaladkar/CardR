import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from '../models/Deck';

export const getSingleDeckController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const singleDeck = await DeckModel.findOne({ _id: deckId });

  res.json(singleDeck);
};
