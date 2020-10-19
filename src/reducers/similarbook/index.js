import { GET_SIMILARBOOK, GET_SIMILARBOOK_SUCCESS, GET_SIMILARBOOK_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function similarbookReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SIMILARBOOK:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case GET_SIMILARBOOK_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.similarbook
        }
      case GET_SIMILARBOOK_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}