import gql from 'graphql-tag'

const ticketsQry = userId => gql`
  {
  eventUserTicket(userId: "${userId}") {
    _id
    eventId {
      name
      date
      time
      address {
        streetName
        streetNumber
        city
      }
    }
    externalUrl
  }
}
`
export { ticketsQry }
