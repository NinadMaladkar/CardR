import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from '../models/Deck';

export const deleteDeckController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deletedDeck = await DeckModel.findByIdAndDelete(deckId);

  res.json(deletedDeck);
};
