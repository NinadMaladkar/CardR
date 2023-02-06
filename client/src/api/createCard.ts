import { API_URL } from './config';
import { Deck } from './fetchAllDecks';

export const createCard = async (
  deckId: string,
  text: string
): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
    }),
  });
  return response.json();
};
