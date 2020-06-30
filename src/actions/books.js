export const Types = {
  GET_BOOKS_REQUEST: 'books/GET_BOOKS_REQUEST',
  GET_BOOKS_SUCCESS: 'books/GET_BOOKS_SUCCESS',
  BOOKS_NOTFOUND: 'books/user_error',
};

export const getBooksRequest = (page, search) => ({
  type: Types.GET_BOOKS_REQUEST,
  payload: {
    page,
    search,
  },
});

export const getBooksSuccess = ({ items, page, search }) => ({
  type: Types.GET_BOOKS_SUCCESS,
  payload: {
    items,
    page,
    search,
  },
});

export const booksError = ({ error }) => ({
  type: Types.BOOKS_NOTFOUND,
  payload: {
      error,
  },
});
