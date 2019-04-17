import { OPEN_WEBVIEW, CLOSE_WEBVIEW } from './types'

export const openWebView = (url, closeOnBack = true) => {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_WEBVIEW,
      url,
      closeOnBack,
    })
  }
}

export const closeWebView = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_WEBVIEW,
      url: '',
      closeOnBack: true,
    })
  }
}
