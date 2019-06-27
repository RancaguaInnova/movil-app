import { BANNER_REQUEST, BANNER_RESPONSE, BANNER_ERROR } from './types'
import { client } from 'providers/ApolloProvider/client'
import { bannersBySectionQry } from 'providers/ApolloProvider/queries'

export const bannerRequest = (type, section = '', data = null, error = null) => {
  return {
    type,
    section,
    loading: type === BANNER_REQUEST,
    data,
    error,
  }
}

export const banners = section => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(bannerRequest(BANNER_REQUEST, section))
    // Call Apollo client
    try {
      const { data } = await client.query({
        query: bannersBySectionQry(section),
      })

      // Dispatch sync action to "notify" the store we finnished the async action
      if (data) {
        data.bannersBySection = data.bannersBySection || []
        data.bannersBySection = data.bannersBySection.map(banner => {
          banner.type = 'banner'
          return banner
        })
      }

      dispatch(bannerRequest(BANNER_RESPONSE, section, data))
      return data
    } catch (error) {
      console.log('Error querying services in:', error)
      dispatch(bannerRequest(BANNER_ERROR, section, null, error))
    }
  }
}
