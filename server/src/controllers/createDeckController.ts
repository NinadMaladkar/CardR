import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import DeckModel from '../models/Deck';

export const createDeckController = async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title,
  });

  const result = await newDeck.save();
  res.json(result);
};
