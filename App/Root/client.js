import {createClient} from '@orion-js/graphql-client'
import url from '../url'
import {AsyncStorage} from 'react-native'

let session = null
let client = null

const recoverSession = async () => {
  try {
    const json = await AsyncStorage.getItem('@orionjsapp:session')
    session = JSON.parse(json)
  } catch (e) {
    session = null
  }
}

const getSession = () => {
  return session
}

const saveSession = async newSession => {
  session = newSession
  await AsyncStorage.setItem('@orionjsapp:session', JSON.stringify(session, null, 2))
  await client.resetStore()
}

client = createClient({
  endpointURL: url,
  useSubscriptions: false,
  saveSession,
  getSession
})

export {getSession, saveSession, recoverSession, client}
