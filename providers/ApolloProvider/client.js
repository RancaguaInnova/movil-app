import { createClient } from '@orion-js/graphql-client'
import { AsyncStorage } from 'react-native'
import { InMemoryCache } from 'apollo-cache-inmemory'
import getEnvVars from 'environment'

const env = getEnvVars()

const sessionKey = '@rancagua_digital:session'
let session = null
let client = null

const recoverSession = async () => {
  try {
    const json = await AsyncStorage.getItem(sessionKey)
    session = JSON.parse(json)
  } catch (e) {
    session = null
  }
}

const getSession = () => {
  return session
}

const removeSession = async () => {
  await saveSession(null)
}

const saveSession = async newSession => {
  session = newSession
  await AsyncStorage.setItem(sessionKey, JSON.stringify(session, null, 2))
  await client.resetStore()
}

const cache = new InMemoryCache()

client = createClient({
  endpointURL: env.apolloUrl,
  useSubscriptions: false,
  saveSession,
  getSession,
  removeSession,
  cache,
})

export { getSession, saveSession, recoverSession, removeSession, client }
