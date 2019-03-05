import { createClient } from '@orion-js/graphql-client'
import url from './url'
import { AsyncStorage } from 'react-native'
import { InMemoryCache } from 'apollo-cache-inmemory'

const sessionKey = '@rancagua_digital:session'
let session = null
let client = null

/* const introKey = '@app:showIntro';
let introVisualization = null; */

const recoverSession = async () => {
  try {
    const json = await AsyncStorage.getItem(sessionKey)
    session = JSON.parse(json)
  } catch (e) {
    console.log('error', e)
    session = null
  }
}

const getSession = async () => {
  let session = await AsyncStorage.getItem(sessionKey)
  return session
}

const removeSession = async () => {
  await saveSession(null)
}

const saveSession = async newSession => {
  await client.clearStore()
  session = newSession
  await AsyncStorage.setItem(sessionKey, JSON.stringify(session, null, 2))
  await client.resetStore()
  //await client.clearStore()
}

/* const getIntroVisualization = () => {
  return introVisualization;
};

const setIntroVisualization = async value => {
  introVisualization = value;
  await AsyncStorage.setItem(introKey, value.toString());
};

const resetIntroVisualization = async () => {
  await AsyncStorage.removeItem(introKey);
  introVisualization = null;
};

const recoverIntroVisualization = async () => {
  introVisualization = await AsyncStorage.getItem(introKey);
}; */
const cache = new InMemoryCache()

client = createClient({
  endpointURL: url,
  useSubscriptions: false,
  saveSession,
  getSession,
  removeSession,
  cache,
})

export {
  getSession,
  saveSession,
  recoverSession,
  removeSession,
  client,
  /*   getIntroVisualization,
  setIntroVisualization,
  resetIntroVisualization,
  recoverIntroVisualization */
}
