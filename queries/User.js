import gql from 'graphql-tag'

const getMeQry = gql`
  query getMe {
    me {
      _id
      profile {
        identifier
      }
      email
      userToken
    }
  }
`

export { getMeQry }
