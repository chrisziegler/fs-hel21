const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_NOTIFICATION':
      return { ...state, message: action.data }
    case 'REMOVE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const sendNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SEND_NOTIFICATION',
      data: message,
    })
    setTimeout(() => {
      dispatch({
        type: 'REOMOVE_NOTIFICATION',
        data: null,
      })
    }, time)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: null,
  }
}

export default notificationReducer
