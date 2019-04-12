import { OPEN_MODAL, CLOSE_MODAL } from './types'

export const openModal = child => {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_MODAL,
      child,
    })
  }
}

export const closeModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_MODAL,
      child: null,
    })
  }
}
