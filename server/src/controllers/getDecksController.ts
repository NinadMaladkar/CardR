import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from '../models/Deck';

export const getDecksController = async (req: Request, res: Response) => {
  const allDecks = await DeckModel.find();

  res.json(allDecks);
};
