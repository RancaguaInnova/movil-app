import { saveSession, getSession } from 'providers/ApolloProvider'
import gql from 'graphql-tag'

const logout = async function() {
  await global.apolloClient.mutate({
    mutation: gql`
      mutation logout {
        logout
      }
    `
  })
  await saveSession(null)
}

global.logout = logout

export { saveSession, getSession, logout }
