import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  SESSION_REQUEST,
  SESSION_RESPONSE,
  SESSION_ERROR
} from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'
import { AsyncStorage } from "react-native"

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

      const me = session.user
      console.log('me:', me)

      // TODO: Save the new session on AsyncStorage
      await AsyncStorage.setItem('@rancagua_digital:session', JSON.stringify(session, null, 2))

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

export const getSession = () => {
  console.log('Running getSession')
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(sessionRequest())
    try {
      const session = await AsyncStorage.getItem('@rancagua_digital:session')
      if (session._id) {
        dispatch(sessionResponse(session))
      } else {
        dispatch(sessionResponse({}))
      }
    } catch(error) {
      dispatch(sessionError(error))
    }
  }
}
