import { Deck } from './fetchAllDecks';
import { API_URL } from './config';
import { Card } from './createCard';

export const getSingleDeck = async (deckId: string): Promise<Card[]> => {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  const deck = await response.json();

  return deck.cards;
};
