import { saveSession } from '../../providers/ApolloProvider'

export default async function(session) {
  return await saveSession(session)
}
