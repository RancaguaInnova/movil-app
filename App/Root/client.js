import { createClient } from '@orion-js/graphql-client'
import url from '../url'
import { AsyncStorage } from 'react-native'

const sessionKey = '@orionjsapp:session'
let session = null
let client = null

const introKey = '@app:showIntro'
let introVisualization = null

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

const saveSession = async newSession => {
  session = newSession
  await AsyncStorage.setItem(sessionKey, JSON.stringify(session, null, 2))
  await client.resetStore()
}

const getIntroVisualization = () => {
  return introVisualization
}

const setIntroVisualization = async value => {
  introVisualization = value
  await AsyncStorage.setItem(introKey, value.toString())
}

const resetIntroVisualization = async () => {
  await AsyncStorage.removeItem(introKey)
  introVisualization = null
}

const recoverIntroVisualization = async () => {
  introVisualization = await AsyncStorage.getItem(introKey)
}

client = createClient({
  endpointURL: url,
  useSubscriptions: false,
  saveSession,
  getSession,
})

export {
  getSession,
  saveSession,
  recoverSession,
  client,
  getIntroVisualization,
  setIntroVisualization,
  resetIntroVisualization,
  recoverIntroVisualization,
}
