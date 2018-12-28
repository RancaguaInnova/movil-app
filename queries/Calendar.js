import gql from 'graphql-tag'

export const eventsByMonth = month => gql`
  {
    eventsByMonth(month: "${month}") {
      _id
      name
      time
      date
      externalUrl
      address {
        streetName
        streetNumber
        city
      }
    }
  }
  `
