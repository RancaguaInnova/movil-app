import {
  DEVICE_REGISTRATION_REQUEST,
  DEVICE_REGISTRATION_RESPONSE,
  DEVICE_REGISTRATION_ERROR,
} from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'

export const deviceRegistrationRequest = () => {
  return {
    type: DEVICE_REGISTRATION_REQUEST,
    loading: true,
  }
}

export const deviceRegistrationResponse = () => {
  return {
    type: DEVICE_REGISTRATION_RESPONSE,
    loading: false,
  }
}

export const deviceRegistrationError = error => {
  return {
    type: DEVICE_REGISTRATION_ERROR,
    loading: false,
    error,
  }
}

export const registerDevice = ({ userId, deviceToken }) => {
  return async (dispatch, getState) => {
    dispatch(deviceRegistrationRequest())
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation registerDevice($userId: ID!, $deviceToken: String!) {
            success: registerDevice(userId: $userId, pushToken: $deviceToken)
          }
        `,
        variables: { userId, deviceToken },
      })

      dispatch(deviceRegistrationResponse())
    } catch (error) {
      console.log('Error on notifications action:', error)
      dispatch(deviceRegistrationError(error))
    }
  }
}
