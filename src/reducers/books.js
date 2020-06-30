import { Types } from '../actions/books';

const INITIAL_STATE = {
    data: null,
    loader: true,
    currentPage: null,
    itemsPerPage: 20,
    search: '',
};

export default function books(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_BOOKS_SUCCESS: {
            return {
                ...state,
                data: action.payload.items,
                loader: false,
                currentPage: action.payload.page,
                itemsPerPage: 20,
                search: action.payload.search,
            };
        }
        case Types.BOOKS_NOTFOUND: {
            return {
                ...state,
                error: action.payload.error,
            };
        }
        default: {
            return {
                ...state,
                loader: true,
            };
        }
    }
}
