import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

interface Deck {
  title: string;
  _id: string;
}

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<Deck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    setTitle('');
  };

  useEffect(() => {
    const fetchAllDecks = async () => {
      const response = await fetch('http://localhost:5000/decks');
      const allDecks = await response.json();
      setDecks(allDecks);
    };
    fetchAllDecks();
  }, []);

  return (
    <div className='App'>
      <div className='decks'>
        {decks.map((deck) => (
          <li key={deck._id}> {deck.title} </li>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title </label>
        <input
          id='deck-title'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button type='submit'>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
