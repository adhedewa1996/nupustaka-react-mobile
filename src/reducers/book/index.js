import { GET_BOOK, GET_BOOK_SUCCESS, GET_BOOK_FAILURE, GET_SIMILARBOOK, GET_SIMILARBOOK_SUCCESS, GET_SIMILARBOOK_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function bookReducer(state = initialState, action) {
    switch (action.type) {
      case GET_BOOK:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case GET_BOOK_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.book
        }
      case GET_BOOK_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}