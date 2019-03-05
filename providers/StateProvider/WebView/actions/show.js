import { OPEN_WEBVIEW, CLOSE_WEBVIEW } from './types'

export const setCurrentUrl = url => {
  const type = url && url.trim() !== '' ? OPEN_WEBVIEW : CLOSE_WEBVIEW
  return {
    type,
    url,
  }
}

export const openWebView = url => {
  return (dispatch, getState) => {
    dispatch(setCurrentUrl(url))
  }
}

export const closeWebView = () => {
  return (dispatch, getState) => {
    dispatch(setCurrentUrl(''))
  }
}
