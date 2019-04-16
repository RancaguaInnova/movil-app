import { OPEN_DRAWER, CLOSE_DRAWER } from './types'

export const openDrawer = () => {
  return (dispatch, getState) => {
    if (getState().drawer.open === false) {
      dispatch({
        type: OPEN_DRAWER,
        open: true,
      })
    }
  }
}

export const closeDrawer = () => {
  return (dispatch, getState) => {
    if (getState().drawer.open === true) {
      dispatch({
        type: CLOSE_DRAWER,
        open: false,
      })
    }
  }
}
