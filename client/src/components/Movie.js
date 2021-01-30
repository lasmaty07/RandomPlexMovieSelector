import React, { useContext  } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Movie = () => {
  const { movie, getMovie } = useContext(GlobalContext);

  const Click = e => {
    getMovie();
  }

  return (
    <>      
    <h2>{movie.title} ({movie.year})</h2>
    <img className="photo" src={movie.image} alt="Logo"/>    
    <button className="btn" onClick={Click}>Search</button>
    </>
  )
}
