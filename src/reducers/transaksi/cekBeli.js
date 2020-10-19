import { CEK_BELI, CEK_BELI_SUCCESS, CEK_BELI_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function cekbeliReducer(state = initialState, action) {
    switch (action.type) {
      case CEK_BELI:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case CEK_BELI_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.cekbeli
        }
      case CEK_BELI_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}