import { SERVICES_REQUEST, SERVICES_RESPONSE, SERVICES_ERROR } from './types'
import { client, clientOpc, createClient } from 'providers/ApolloProvider/client'
import gql from 'graphql-tag'

export const servicesRequest = () => {
    return {
        type: SERVICES_REQUEST,
        loading: true
    }
}

export const servicesResponse = services => {
    services.updatedAt = new Date()
    return {
        type: SERVICES_RESPONSE,
        loading: false,
        services
    }
}

export const servicesError = error => {
    return {
        type: SERVICES_ERROR,
        loading: false,
        error
    }
}

export const services = () => {
    return async (dispatch, getState) => {
        // Dispatch sync action to "notify" the store we are initiating an async action
        dispatch(servicesRequest())
        // Call Apollo client
        try {
            const { data: { services } } = await client.query({
                query: gql`
                    {
                        services: applications {
                            _id
                            items {
                                name
                                description
                                applicationURL
                                appToken
                                appMovil
                                urlApp
                                appName
                                appStoreId
                                appStoreLocale
                                playStoreId
                            }
                        }
                    }
                `,
                fetchPolicy: 'no-cache'
            })
            // Dispatch sync action to "notify" the store we finnished the async action
            dispatch(servicesResponse(services))
            return Promise.resolve(services)
        } catch (error) {
            console.log('Error querying services in:', error)
            dispatch(servicesError(error))
            return Promise.reject(error)
        }
    }
}
