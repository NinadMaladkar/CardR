import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import SingleDeck from './components/SingleDeck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'deck/:deckId',
    element: <SingleDeck />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
