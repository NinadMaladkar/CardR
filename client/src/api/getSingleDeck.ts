import { Deck } from './fetchAllDecks';
import { API_URL } from './config';

export const getSingleDeck = async (deckId: string): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  const deck = await response.json();

  return deck;
};
