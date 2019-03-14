import initialState from '../../initialState'
import { OPEN_WEBVIEW, CLOSE_WEBVIEW } from '../actions/types'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_WEBVIEW:
      return {
        ...state,
        url: action.url,
        closeOnBack: action.closeOnBack,
      }
    case CLOSE_WEBVIEW:
      return {
        ...state,
        url: '',
        closeOnBack: true,
      }
    default:
      return state
  }
}
