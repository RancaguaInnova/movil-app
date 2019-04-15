import buildUrl from 'build-url'
import _merge from 'lodash/merge'
import queryString from 'query-string'

export const parseUrl = (url, params = {}) => {
  try {
    let basePath = url.trim()
    let queryParams = {}

    const qry = url.split('?')
    if (qry.length > 1) {
      _merge(queryParams, queryString.parse(qry[1]), params)
      basePath = qry[0].trim()
    } else {
      queryParams = params || {}
    }
    queryParams.v = Math.random()
    return buildUrl(basePath, { queryParams })
  } catch (error) {
    console.error('error!', error)
    return url
  }
}
