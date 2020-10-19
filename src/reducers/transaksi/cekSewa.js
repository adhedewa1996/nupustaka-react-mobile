import { CEK_SEWA, CEK_SEWA_SUCCESS, CEK_SEWA_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function ceksewaReducer(state = initialState, action) {
    switch (action.type) {
      case CEK_SEWA:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case CEK_SEWA_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.ceksewa
        }
      case CEK_SEWA_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}