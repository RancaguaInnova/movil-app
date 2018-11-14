import gql from 'graphql-tag'
import saveSession from './saveSession'

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

export default logout
