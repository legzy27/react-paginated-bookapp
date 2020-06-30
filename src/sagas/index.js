import { all } from 'redux-saga/effects';
import userSagas from './books';

export default function* rootSaga() {
  yield all([
    ...userSagas,
  ]);
}
