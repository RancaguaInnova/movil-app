import initialState from '../../initialState'
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        child: action.child,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        child: null,
      }
    default:
      return state
  }
  return state
}
