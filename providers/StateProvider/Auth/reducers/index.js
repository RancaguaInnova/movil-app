import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  SESSION_REQUEST,
  SESSION_RESPONSE,
  SESSION_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE,
  LOGOUT_ERROR,
  REGISTRATION_ERROR,
  REGISTRATION_REQUEST,
  REGISTRATION_RESPONSE,
} from '../actions/types'
import initialState from '../../initialState'

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case LOGIN_RESPONSE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        session: action.session,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case SESSION_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case SESSION_RESPONSE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        session: action.session,
      }
    case SESSION_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case LOGOUT_RESPONSE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        session: action.session,
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case REGISTRATION_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case REGISTRATION_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      }
    case REGISTRATION_RESPONSE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        session: action.session,
      }
    default:
      return state
  }
}
