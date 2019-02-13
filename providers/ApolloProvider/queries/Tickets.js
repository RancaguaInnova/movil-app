import gql from 'graphql-tag'

const ticketsQry = userId => gql`
  {
  eventUserTicket(userId: "${userId}") {
    _id
    event {
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
