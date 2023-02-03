import { API_URL } from './config';

export interface Deck {
  title: string;
  _id: string;
}

export const fetchAllDecks = async (): Promise<Deck[]> => {
  const response = await fetch(`${API_URL}/decks`);
  const allDecks = await response.json();
  return allDecks;
};
