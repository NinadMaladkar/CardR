import { API_URL } from './config';

export const deleteDeck = async (deckId: string) => {
  try {
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error('Error occurred deleting the requeset - ', error);
  }
};
