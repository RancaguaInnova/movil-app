import {
    SERVICES_REQUEST,
    SERVICES_RESPONSE,
    SERVICES_ERROR,
  } from '../actions/types'
  import initialState from '../../initialState'

  export default (state = initialState, action) => {
    switch(action.type) {
      case SERVICES_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case SERVICES_RESPONSE:
        return {
          ...state,
          loading: false,
          services: action.services
        }
      case SERVICES_ERROR:
        return {
          ...state,
          error: action.error
        }
      default:
        return state
    }
  }

