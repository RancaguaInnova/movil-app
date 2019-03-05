import initialState from '../../initialState'
import { OPEN_WEBVIEW, CLOSE_WEBVIEW } from '../actions/types'

export default (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case OPEN_WEBVIEW:
      return {
        ...state,
        url: action.url,
      }
    case CLOSE_WEBVIEW:
      return {
        ...state,
        url: '',
      }
    default:
      return state
  }
}
