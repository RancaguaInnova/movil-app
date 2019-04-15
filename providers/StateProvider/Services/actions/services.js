import { SERVICES_REQUEST, SERVICES_RESPONSE, SERVICES_ERROR } from './types'
import { client } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'

export const servicesRequest = () => {
  return {
    type: SERVICES_REQUEST,
    loading: true,
  }
}

export const servicesResponse = services => {
  return {
    type: SERVICES_RESPONSE,
    loading: false,
    services,
  }
}

export const servicesError = error => {
  return {
    type: SERVICES_ERROR,
    loading: false,
    error,
  }
}

export const services = () => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(servicesRequest())
    // Call Apollo client
    try {
      const {
        data: { services },
      } = await client.query({
        query: gql`
          {
            services: applications {
              _id
              items {
                name
                description
                applicationURL
                appToken
              }
            }
          }
        `,
      })

      // Dispatch sync action to "notify" the store we finnished the async action
      dispatch(servicesResponse(services))
      return services
    } catch (error) {
      console.error('Error querying services in:', error)
      dispatch(servicesError(error))
    }
  }
}
