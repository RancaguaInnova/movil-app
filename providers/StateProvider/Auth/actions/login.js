import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR } from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'
import { saveSession } from 'providers/ApolloProvider/client'

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
    loading: true,
    error: null,
  }
}

export const loginResponse = session => {
  return {
    type: LOGIN_RESPONSE,
    loading: false,
    error: null,
    session,
  }
}

export const loginError = error => {
  debugger
  return {
    type: LOGIN_ERROR,
    loading: false,
    error,
  }
}

export const login = (email, password) => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(loginRequest())
    // Call Apollo client with the login mutation here
    try {
      const {
        data: { session },
      } = await client.mutate({
        mutation: gql`
          mutation loginWithPassword($email: String, $password: String) {
            session: loginWithPassword(email: $email, password: $password) {
              _id
              userId
              publicKey
              secretKey
              userId
              locale
              roles
              emailVerified
              user {
                _id
                email
                userToken
                emails {
                  address
                  verified
                }
                profile {
                  identifier
                  firstName
                  lastName
                  gender
                  birthdate
                  educationalLevel
                  subscriptions {
                    absence
                  }
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
              }
            }
          }
        `,
        variables: { email, password },
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
