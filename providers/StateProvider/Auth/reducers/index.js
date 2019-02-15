import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR } from '../actions/types'
import initialState from '../../initialState'

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_RESPONSE:
      return {
        ...state,
        loading: false,
        session: action.session
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
