import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createCard, Card } from '../api/createCard';
import { deleteCardFromDeck } from '../api/deleteCardFromDeck';
import { Deck } from '../api/fetchAllDecks';
import { getSingleDeck } from '../api/getSingleDeck';
import './SingleDeck.css';

const SingleDeck = () => {
  const { deckId } = useParams();
  // const [deck, setDeck] = useState<Deck | null>(null);
  const [frontText, setFrontText] = useState<string>('');
  const [backText, setBackText] = useState<string>('');
  const [cards, setCards] = useState<Card[] | null>([]);
  const [showBackText, setShowBackText] = useState(false);

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckId) return;

    const result = await createCard(deckId, frontText, backText);
    console.log('RESULT ===>>>', result);

    setCards(result.cards);
    setFrontText('');
    setBackText('');
  };

  const handleDeleteCard = async (cardIndex: number) => {
    if (!deckId) return;
    const updatedDeck = await deleteCardFromDeck(deckId, cardIndex);

    setCards(updatedDeck.cards);
  };

  const handleCardFlip = (cardIndex: number) => {
    console.log(cardIndex);

    setShowBackText((showBackText) => !showBackText);
  };

  useEffect(() => {
    const getDeckData = async () => {
      if (!deckId) return;
      const newDeck = await getSingleDeck(deckId);

      setCards(newDeck);
    };
    getDeckData();
  }, [deckId]);

  return (
    <div className='card-container'>
      <form onSubmit={handleCreateCard}>
        <fieldset className='form-fieldset'>
          <h3>Add New Card</h3>
          <label htmlFor='create-card'>Front</label>
          <input
            required
            id='create-card'
            className='card-input'
            value={frontText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFrontText(e.target.value);
            }}
          />
          <label htmlFor='create-card'>Back</label>
          <input
            required
            id='create-card'
            className='card-input'
            value={backText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBackText(e.target.value);
            }}
          />
          <button type='submit' className='submit'>
            Add Card
          </button>
        </fieldset>
      </form>
      <div className='cards'>
        {cards
          ? cards.map((card: Card, index: number) => (
              <li key={index}>
                {card.frontText}
                <button onClick={() => handleDeleteCard(index)}>x</button>
              </li>
            ))
          : 'No card for this deck!'}
      </div>
    </div>
  );
};

export default SingleDeck;
