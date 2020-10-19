import { GET_DISPLAYBOOK, GET_DISPLAYBOOK_SUCCESS, GET_DISPLAYBOOK_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function displaybooksReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DISPLAYBOOK:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case GET_DISPLAYBOOK_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.displaybooks
        }
      case GET_DISPLAYBOOK_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}