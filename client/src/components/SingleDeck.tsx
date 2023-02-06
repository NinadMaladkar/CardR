import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createCard } from '../api/createCard';
import { deleteCardFromDeck } from '../api/deleteCardFromDeck';
import { Deck } from '../api/fetchAllDecks';
import { getSingleDeck } from '../api/getSingleDeck';
import '../App.css';

interface Card {
  text: string;
}

const SingleDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [text, setText] = useState<string>('');
  const [cards, setCards] = useState<string[]>([]);

  const handleCreateCard = async (deckId: any, cardText: string) => {
    const result = await createCard(deckId, cardText);

    setCards(result.cards);
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
      console.log(' <<>> ', newDeck);

      setDeck(newDeck);
      setCards(newDeck.cards);
    };
    getDeckData();
    console.log(deck, ' <<< DECK');
  }, [deckId]);

  return (
    <div className='cardContainer'>
      <div className='decks'>
        {cards
          ? cards.map((card: string, index: number) => (
              <li key={index}>
                {card}{' '}
                <button onClick={() => handleDeleteCard(index)}>x</button>
              </li>
            ))
          : 'No card for this deck!'}
      </div>
      <label htmlFor='create-card'>Create Card</label>
      <input
        className='card-input'
        id='create-card'
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className='create-card-btn'
        onClick={() => handleCreateCard(deckId, text)}>
        Create Card
      </button>
    </div>
  );
};

export default SingleDeck;
