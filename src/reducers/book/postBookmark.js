import { POST_BOOKMARK, POST_BOOKMARK_SUCCESS, POST_BOOKMARK_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function bookmarkbookReducer(state = initialState, action) {
    switch (action.type) {
      case POST_BOOKMARK:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case POST_BOOKMARK_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.bookmarkbook
        }
      case POST_BOOKMARK_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}