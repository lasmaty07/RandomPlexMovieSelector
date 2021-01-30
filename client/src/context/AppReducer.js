export default (state, action) => {
  switch(action.type) {
    case 'GET_MOVIE':
      console.log(action.payload)
      return {
        ...state,
        loading: false,        
        movie: action.payload            
      }    
    case 'MOVIE_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}