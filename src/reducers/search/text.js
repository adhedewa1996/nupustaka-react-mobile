import { POST_SEARCHTEXT, POST_SEARCHTEXT_SUCCESS, POST_SEARCHTEXT_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function searchtextReducer(state = initialState, action) {
    switch (action.type) {
      case POST_SEARCHTEXT:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case POST_SEARCHTEXT_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.searchtext
        }
      case POST_SEARCHTEXT_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}