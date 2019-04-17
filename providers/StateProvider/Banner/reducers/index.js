import { BANNER_REQUEST, BANNER_RESPONSE, BANNER_ERROR } from '../actions/types'
import initialState from '../../initialState'

export default (state = initialState, action) => {
  if ([BANNER_REQUEST, BANNER_RESPONSE, BANNER_ERROR].indexOf(action.type) !== -1) {
    return {
      ...state,
      ...action,
    }
  } else {
    return state
  }
}
