import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  SESSION_REQUEST,
  SESSION_RESPONSE,
  SESSION_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  LOGOUT_ERROR
} from '../actions/types'
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
    case SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SESSION_RESPONSE:
      return {
        ...state,
        loading: false,
        session: action.session
      }
    case SESSION_ERROR:
      return {
        ...state,
        error: action.error
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT_RESPONSE:
      return {
        ...state,
        loading: false,
        session: action.session
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
