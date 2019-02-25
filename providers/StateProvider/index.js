import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { loginRequest, loginResponse, loginError } from './Auth/actions'
import rootReducer from './rootReducer'
import initialState from './initialState'

export default createStore(rootReducer, initialState, applyMiddleware(thunk))
