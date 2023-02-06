import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createCard } from '../api/createCard';
import { deleteCardFromDeck } from '../api/deleteCardFromDeck';
import { Deck } from '../api/fetchAllDecks';
import { getSingleDeck } from '../api/getSingleDeck';
import './SingleDeck.css';

interface Card {
  text: string;
}

const SingleDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [text, setText] = useState<string>('');
  const [cards, setCards] = useState<string[]>([]);

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckId) return;

    const result = await createCard(deckId, text);

    setCards(result.cards);
    setText('');
  };

  const handleDeleteCard = async (cardIndex: number) => {
    if (!deckId) return;
    const updatedDeck = await deleteCardFromDeck(deckId, cardIndex);

    setCards(updatedDeck.cards);
  };

  useEffect(() => {
    const getDeckData = async () => {
      if (!deckId) return;
      const newDeck = await getSingleDeck(deckId);

      setDeck(newDeck);
      setCards(newDeck.cards);
    };
    getDeckData();
  }, [deckId]);

  return (
    <div className='card-container'>
      <form onSubmit={handleCreateCard}>
        <fieldset className='form-fieldset'>
          <h3>Add New Card</h3>
          <label htmlFor='create-card'>Card Title </label>
          <input
            id='create-card'
            className='card-input'
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
          <button type='submit' className='submit'>
            Add Card
          </button>
        </fieldset>
      </form>
      <div className='cards'>
        {cards
          ? cards.map((card: string, index: number) => (
              <li key={index}>
                {card}
                <button onClick={() => handleDeleteCard(index)}>x</button>
              </li>
            ))
          : 'No card for this deck!'}
      </div>
    </div>
  );
};

export default SingleDeck;
