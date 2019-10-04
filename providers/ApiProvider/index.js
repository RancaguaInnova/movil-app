import store from 'providers/StateProvider'
import _get from 'lodash/get'
import getEnvVars from 'environment'

const env = getEnvVars()
var sessionToken = ''

store.subscribe(() => {
  try {
    const state = store.getState()
    sessionToken = _get(state, 'auth.session.user.userToken', '')
  } catch (error) {
    sessionToken = ''
  }
})

export const callApi = async (path = '', options = {}) => {
  try {
    const _url = env.apiUrl.concat(path)

    // Add session token to request header
    const _headers = options.headers || {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `OrionBearer ${sessionToken}`,
    }

    const _opc = {
      method: options.method || 'GET',
      headers: _headers,
      cache: options.cache || 'default',
    }

    if (['POST', 'PUT'].indexOf(_opc.method.toUpperCase()) !== -1) {
      _opc.body = options.body || {}
    }

    const response = await fetch(_url, _opc)
    const responseJson = await response.json()
    return Promise.resolve(responseJson)
  } catch (error) {
    return Promise.reject(error)
  }
}
