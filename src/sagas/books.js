import {
  takeEvery,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as actions from '../actions/books';
import * as api from '../api/books';

function* getBooks(data) {
  try {
      const result = yield call(api.getBooks, data.payload.page, data.payload.search);
      yield put(actions.getBooksSuccess({
        items: result,
        page: data.payload.page,
        search: data.payload.search,
      }));
  } catch (e) {
      yield put(actions.booksError({
          error: 'An error occurred when trying to get the users',
      }));
  }
}

function* watchGetBooksRequest() {
  yield takeEvery(actions.Types.GET_BOOKS_REQUEST, getBooks);
}

const userSagas = [
  fork(watchGetBooksRequest),
];

export default userSagas;
