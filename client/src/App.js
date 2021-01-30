import React from 'react';
import { Header } from './components/Header';
import { Movie } from './components/Movie';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Movie />
      </div>
    </GlobalProvider>
  );
}

export default App;
