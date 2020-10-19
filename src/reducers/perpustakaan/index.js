import { GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CATEGORY:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.categories
        }
      case GET_CATEGORY_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}