import { CARDS_REQUEST, CARDS_RESPONSE, CARDS_ERROR } from './types'
import { client } from 'providers/ApolloProvider/client'
import { cardListQry } from 'providers/ApolloProvider/queries'
import gql from 'graphql-tag'
import _compact from 'lodash/compact'

export const cardsRequest = (type, data = null, error = null) => {
  return {
    type,
    loading: type === CARDS_REQUEST,
    data,
    error,
  }
}

export const cards = () => {
  return async (dispatch, getState) => {
    // Dispatch sync action to "notify" the store we are initiating an async action
    dispatch(cardsRequest(CARDS_REQUEST))
    // Call Apollo client
    try {
      const { data } = await client.query({
        query: cardListQry,
      })

      // Dispatch sync action to "notify" the store we finnished the async action
      if (data) {
        data.cardsList = data.cardsList || []
        data.cardsList = data.cardsList.map(card => {
          card.type = 'indicator'
          if (card.icon || card.iconUrl) return card
        })

        data.cardsList = _compact(data.cardsList)
      }
      dispatch(cardsRequest(CARDS_RESPONSE, data))
      return data
    } catch (error) {
      console.log('Error querying services in:', error)
      dispatch(cardsRequest(CARDS_ERROR, null, error))
    }
  }
}
