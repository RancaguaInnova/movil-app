import { LOGOUT_REQUEST, LOGOUT_RESPONSE, LOGOUT_ERROR } from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'
import { removeSession } from 'providers/ApolloProvider/client'

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
    loading: true,
  }
}

export const logoutResponse = () => {
  return {
    type: LOGOUT_RESPONSE,
    loading: false,
    session: {},
  }
}

export const logoutError = error => {
  return {
    type: LOGOUT_ERROR,
    loading: false,
    error,
  }
}

export const logout = sessionId => {
  return async (dispatch, getState) => {
    dispatch(logoutRequest())
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation logout($sessionId: ID) {
            logout: logout(sessionId: $sessionId)
          }
        `,
        variables: { sessionId },
      })
      await removeSession()
      dispatch(logoutResponse())
    } catch (error) {
      console.log('Error on logout action:', error)
      dispatch(logoutError(error))
    }
  }
}
