import {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_RESPONSE,
  NOTIFICATIONS_ERROR
} from './types'

import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'

export const notificationsRequest = () => {
  return {
    type: NOTIFICATIONS_REQUEST,
    loading: true
  }
}

export const notificationsResponse = () => {
  return {
    type: NOTIFICATIONS_RESPONSE,
    loading: false,
  }
}

export const notificationsError = error => {
  return {
    type: NOTIFICATIONS_ERROR,
    loading: false,
    error
  }
}

export const notifications = ({ userId, deviceToken }) => {
  return async (dispatch, getState) => {
    dispatch(notificationsRequest())
    try {
      const response = await client.mutate({
        mutation: gql`mutation registerDevice($userId: ID!, $deviceToken: ID!) {
          success: registerDevice(userId: $userId, deviceToken: $deviceToken)
        }`,
        variables: { userId, deviceToken }
      })
      dispatch(notificationsResponse())
    } catch(error) {
      console.log('Error on notifications action:', error)
      dispatch(notificationsError(error))
    }
  }
}
