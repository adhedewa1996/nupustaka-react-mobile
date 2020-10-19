import { CEK_PINJAM, CEK_PINJAM_SUCCESS, CEK_PINJAM_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function cekpinjamReducer(state = initialState, action) {
    switch (action.type) {
      case CEK_PINJAM:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case CEK_PINJAM_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.cekpinjam
        }
      case CEK_PINJAM_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}