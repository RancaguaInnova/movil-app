import auth from './Auth/reducers'
import webview from './WebView/reducers'
import services from './Services/reducers'
import { combineReducers } from 'redux'

// Reducers will be combined in an objects each with a unique "initialState".
// Name the imported reducer to reflect this object
export default combineReducers({ auth, services, webview })
