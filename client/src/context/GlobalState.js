import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  movie: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getMovie() {
    try {
      const res = await axios.get('/api/v1/movie');

      dispatch({
        type: 'GET_MOVIE',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'MOVIE_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<GlobalContext.Provider value={{
    movie: state.movie,
    error: state.error,
    loading: state.loading,
    getMovie
  }}>
    {children}
  </GlobalContext.Provider>);
}