import { POST_BELI, POST_BELI_SUCCESS, POST_BELI_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function beliReducer(state = initialState, action) {
    switch (action.type) {
      case POST_BELI:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case POST_BELI_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.beli
        }
      case POST_BELI_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}