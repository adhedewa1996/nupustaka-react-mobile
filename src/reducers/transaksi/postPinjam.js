import { POST_PINJAM, POST_PINJAM_SUCCESS, POST_PINJAM_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function pinjamReducer(state = initialState, action) {
    switch (action.type) {
      case POST_PINJAM:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case POST_PINJAM_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.pinjam
        }
      case POST_PINJAM_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}