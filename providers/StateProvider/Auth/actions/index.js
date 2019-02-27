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
} from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'
import { saveSession, getSession, removeSession } from 'providers/ApolloProvider/client'

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
    loading: true
  }
}

export const loginResponse = session => {
  return {
    type: LOGIN_RESPONSE,
    loading: false,
    session
  }
}

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    loading: false,
    error
  }
}

export const login = (email, password) => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(loginRequest())
    // Call Apollo client with the login mutation here
    try {
      const { data: { session } } = await client.mutate({
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
              profile {
                identifier
                firstName
                lastName
                gender
                birthdate
                educationalLevel
                address {
                  streetName
                  streetNumber
                  departmentNumber
                  city
                  postalCode
                }
                phone {
                  mobilePhone
                }
              }
              email
              userToken
            }
          }
        }`,
        variables: {email, password}
      })

      await saveSession(session)
      // Dispatch sync action to "notify" the store we finnished the async action
      dispatch(loginResponse(session))
    } catch (error) {
      console.log('Error login in:', error)
      dispatch(loginError(error))
    }
  }
}

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
      const session = JSON.parse(await getSession())
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

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
    loading: true
  }
}

export const logoutResponse = () => {
  return {
    type: LOGOUT_RESPONSE,
    loading: false,
    session: {}
  }
}

export const logoutError = error => {
  return {
    type: LOGOUT_ERROR,
    loading: false,
    error
  }
}

export const logout = sessionId => {
  return async (dispatch, getState) => {
    dispatch(logoutRequest())
    try {
      const response = await client.mutate({
        mutation: gql`mutation logout($sessionId: ID) {
          logout: logout(sessionId: $sessionId)
        }`,
        variables: { sessionId }
      })
      await removeSession()
      dispatch(logoutResponse())
    } catch(error) {
      console.log('Error on logout action:', error)
      dispatch(logoutError(error))
    }
  }
}
