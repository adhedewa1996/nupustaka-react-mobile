import { CEK_BOOKMARK, CEK_BOOKMARK_SUCCESS, CEK_BOOKMARK_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function cekbookmarkbookReducer(state = initialState, action) {
    switch (action.type) {
      case CEK_BOOKMARK:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case CEK_BOOKMARK_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.cekbookmarkbook
        }
      case CEK_BOOKMARK_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}