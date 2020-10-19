import { POST_SEARCH, POST_SEARCH_SUCCESS, POST_SEARCH_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function searchbooksReducer(state = initialState, action) {
    switch (action.type) {
      case POST_SEARCH:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case POST_SEARCH_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.searchbooks
        }
      case POST_SEARCH_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}