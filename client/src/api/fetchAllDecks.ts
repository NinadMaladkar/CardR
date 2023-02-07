import { API_URL } from './config';
import { Card } from './createCard';

export interface Deck {
  title: string;
  _id: string;
  cards: Card[];
}

export const fetchAllDecks = async (): Promise<Deck[]> => {
  const response = await fetch(`${API_URL}/decks`);
  const allDecks = await response.json();
  return allDecks.cards;
};
