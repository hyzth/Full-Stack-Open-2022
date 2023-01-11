import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timer = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    },
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const createNotification = (message, duration) => {
  return dispatch => {
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(addNotification(message))
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer