import {
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_RESPONSE,
  PROFILE_UPDATE_ERROR,
} from './types'
import { removeTypenameDeep, cleanErrorMessage } from '../../helpers'

import { client, saveSession } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'
import cloneDeep from 'lodash/cloneDeep'

export const profileUpdateRequest = () => {
  return {
    type: PROFILE_UPDATE_REQUEST,
    loading: true
  }
}

export const profileUpdateResponse = session => {
  return {
    type: PROFILE_UPDATE_RESPONSE,
    loading: false,
    session
  }
}

export const profileUpdateError = error => {
  return {
    type: PROFILE_UPDATE_ERROR,
    loading: false,
    error
  }
}

export const updateProfile = userInput => {
  // Delete "__typename" key, value pairs that are not include in Input type
  userInput = removeTypenameDeep(userInput)
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(profileUpdateRequest())
    // Call Apollo client
    try {
      const { data: { user } } = await client.mutate({
        mutation: gql`mutation updateUser($user: UserInput) {
          user: updateUser(user: $user) {
            _id
            email
            userToken
            profile {
              firstName
              lastName
              identifier
              gender
              birthdate
              educationalLevel
              subscriptions {
                absence absence
              }
              address {
                streetName
                streetNumber
                departmentNumber
                city
                postalCode
              }
              phone {
                areaCode
                number
                mobilePhone
              }
            }
          }
        }`,
        variables: { user: userInput }
      })

      // Merge the User type with the Session type
      const currentState = getState()
      const newSession = cloneDeep(currentState.auth.session)
      newSession.user = user
      await saveSession(newSession)
      // Dispatch sync action to "notify" the store we finnished the async action
      dispatch(profileUpdateResponse(newSession))
    } catch (error) {
      dispatch(profileUpdateError(cleanErrorMessage(error)))
    }
  }
}
