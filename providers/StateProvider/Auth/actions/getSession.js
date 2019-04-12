import {
  SESSION_REQUEST,
  SESSION_RESPONSE,
  SESSION_ERROR,
} from './types'

import { getSession } from 'providers/ApolloProvider/client'

export const sessionRequest = () => {
  return {
    type: SESSION_REQUEST,
    loading: true
  }
}

export const sessionResponse = session => {
  return {
    type: SESSION_RESPONSE,
    loading: false,
    session
  }
}

export const sessionError = error => {
  return {
    type: SESSION_ERROR,
    loading: false,
    error
  }
}

export const requestSession = () => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(sessionRequest())
    try {
      const session = getSession()
      if (session && session._id) {
        dispatch(sessionResponse(session))
      } else {
        dispatch(sessionResponse({}))
      }
    } catch(error) {
      dispatch(sessionError(error))
    }
  }
}
