import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from "../../actions/types"

const initialState = {
    items: '',
    isFetching: false,
    error: false
}
  
export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_USER:
        return {
          ...state,
          items: '',
          isFetching: true
        }
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.user
        }
      case LOGIN_USER_FAIL:
        return {
          ...state,
          isFetching: false,
          error: true
        }
      default:
        return state
    }
}