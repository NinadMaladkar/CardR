import { API_URL } from './config';

export const deleteCardFromDeck = async (deckId: string, cardIndex: number) => {
  try {
    const response = await fetch(
      `${API_URL}/decks/${deckId}/cards/${cardIndex}`,
      {
        method: 'DELETE',
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error occurred deleting the requeset - ', error);
  }
};
