import { REGISTRATION_REQUEST, REGISTRATION_RESPONSE, REGISTRATION_ERROR } from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'
import { saveSession } from 'providers/ApolloProvider/client'

export const registrationRequest = () => {
  return {
    type: REGISTRATION_REQUEST,
    loading: true,
  }
}

export const registrationResponse = session => {
  return {
    type: REGISTRATION_RESPONSE,
    loading: false,
    session,
  }
}

export const registrationError = error => {
  return {
    type: REGISTRATION_ERROR,
    loading: false,
    error,
  }
}

export const register = ({ email, password, profile }) => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(registrationRequest())
    let createUser = null
    // Call Apollo client with the registration mutation here
    try {
      createUser = await client.mutate({
        mutation: gql`
          mutation createUser($email: String, $password: String, $profile: UserProfileInput) {
            session: createUser(email: $email, password: $password, profile: $profile) {
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
                  subscriptions {
                    absence
                  }
                }
                email
                userToken
              }
            }
          }
        `,
        variables: { email, password, profile },
      })
    } catch (error) {
      dispatch(registrationError(error))
      return null
    } finally {
      if (createUser) {
        const {
          data: { session },
        } = createUser

        await saveSession(session)

        // Dispatch sync action to "notify" the store we finnished the async action
        dispatch(registrationResponse(session))
        return session
      } else {
        return null
      }
    }
  }
}
