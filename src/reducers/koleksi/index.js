import { GET_KOLEKSI, GET_KOLEKSI_SUCCESS, GET_KOLEKSI_FAILURE } from "../../actions/types"

const initialState = {
    items: [],
    isFetching: false,
    error: false
}
  
export default function koleksibookReducer(state = initialState, action) {
    switch (action.type) {
      case GET_KOLEKSI:
        return {
          ...state,
          items: [],
          isFetching: true
        }
      case GET_KOLEKSI_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.koleksibook
        }
      case GET_KOLEKSI_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}