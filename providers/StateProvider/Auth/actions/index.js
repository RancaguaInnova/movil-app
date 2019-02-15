import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR
} from './types'
import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginResponse = session => {
  return {
    type: LOGIN_RESPONSE,
    session
  }
}

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export const login = (email, password) => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(loginRequest())
    // Call Apollo client with the login mutation here
    try {
      console.log('Calling ApolloClient:')
      const session = await client.mutate({
        mutation: gql`mutation loginWithPassword($email: String, $password: String) {
          session: loginWithPassword(email: $email, password: $password) {
            _id
            publicKey
            secretKey
            userId
            locale
            roles
            emailVerified
            user {
              _id
            }
          }
        }`,
        variables: {email, password}
      })
      // Dispatch sync action to "notify" the store we finnished the async action
      dispatch(loginResponse(session))
      console.log('Dispatched response action')
    } catch (error) {
      console.log('Error login in:', error)
      dispatch(loginError(error))
    }
  }
}
