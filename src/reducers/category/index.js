import { GET_CATEGORYBOOK, GET_CATEGORYBOOK_SUCCESS, GET_CATEGORYBOOK_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function categoriesbooksReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CATEGORYBOOK:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case GET_CATEGORYBOOK_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.categoriesbooks
        }
      case GET_CATEGORYBOOK_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}