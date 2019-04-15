import { CARDS_REQUEST, CARDS_RESPONSE, CARDS_ERROR } from '../actions/types'
import initialState from '../../initialState'

export default (state = initialState, action) => {
  if ([CARDS_REQUEST, CARDS_RESPONSE, CARDS_ERROR].indexOf(action.type) !== -1) {
    console.log('reducer: ', action.type)
    return {
      ...state,
      ...action,
    }
  } else {
    return state
  }
}
