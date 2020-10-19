import { POST_SEWA, POST_SEWA_SUCCESS, POST_SEWA_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function sewaReducer(state = initialState, action) {
    switch (action.type) {
      case POST_SEWA:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case POST_SEWA_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.sewa
        }
      case POST_SEWA_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}