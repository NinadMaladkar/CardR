import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Deck, fetchAllDecks } from './api/fetchAllDecks';
import { deleteDeck } from './api/deleteDeck';
import { createDeck } from './api/createDeck';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<Deck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDeck: Deck = await createDeck(title);
    setDecks([...decks, newDeck]);
    setTitle('');
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    const getDecks = async () => {
      const allDecks = await fetchAllDecks();
      setDecks(allDecks);
    };
    getDecks();
  }, []);

  return (
    <div className='App'>
      <form onSubmit={handleCreateDeck}>
        <fieldset className='form-fieldset'>
          <h3>Create New Deck</h3>
          <label htmlFor='deck-title'>Deck Title </label>
          <input
            id='deck-title'
            className='form-input'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button type='submit' className='submit'>
            Create Deck
          </button>
        </fieldset>
      </form>
      <hr />
      <h2>Your Current Decks</h2>
      <div className='decks'>
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link to={`deck/${deck._id}`}>{deck.title}</Link>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
