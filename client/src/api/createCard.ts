import { API_URL } from './config';
import { Deck } from './fetchAllDecks';

export interface Card {
  frontText: string;
  backText: string;
}

export const createCard = async (
  deckId: string,
  frontText: string,
  backText: string
): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      frontText: frontText,
      backText: backText,
    }),
  });

  return response.json();
};
