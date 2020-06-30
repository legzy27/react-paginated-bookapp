import { combineReducers } from 'redux';
import BooksReducer from './books';

export default combineReducers({
  books: BooksReducer,
});
