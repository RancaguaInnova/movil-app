import initialState from '../../initialState'
import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/types'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        open: action.open,
      }
    case CLOSE_DRAWER:
      return {
        ...state,
        open: action.open,
      }
    default:
      return state
  }
  return state
}
