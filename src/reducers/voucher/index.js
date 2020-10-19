import { POST_VOUCHER, POST_VOUCHER_SUCCESS, POST_VOUCHER_FAILURE } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function voucherReducer(state = initialState, action) {
    switch (action.type) {
      case POST_VOUCHER:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case POST_VOUCHER_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.voucher
        }
      case POST_VOUCHER_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}