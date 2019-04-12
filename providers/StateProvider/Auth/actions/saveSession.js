import {
  SESSION_UPDATE_REQUEST,
  SESSION_UPDATE_RESPONSE,
  SESSION_UPDATE_ERROR,
} from './types'

import { saveSession } from 'providers/ApolloProvider/client'

export const sessionUpdateRequest = newSession => {
  return {
    type: SESSION_UPDATE_REQUEST,
    loading: true
  }
}

export const sessionUpdateResponse = session => {
  return {
    type: SESSION_UPDATE_RESPONSE,
    loading: false,
    session
  }
}

export const sessionUpdateError = error => {
  return {
    type: SESSION_UPDATE_ERROR,
    loading: false,
    error
  }
}

export const requestUpdateSession = session => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(sessionUpdateRequest(session))
    try {
      // TODO: Implement this!
    } catch(error) {
      dispatch(sessionUpdateError(error))
    }
  }
}
