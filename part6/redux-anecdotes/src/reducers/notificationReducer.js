const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SEND_NOTIFICATION':
      return { ...state, message: action.data }
    case 'REMOVE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let timeoutId

function clearNotify() {
  clearTimeout(timeoutId)
}

export const sendNotification = (notification, time) => {
  return async dispatch => {
    dispatch(showNotification(notification))

    const timingFunc = () => {
      timeoutId = setTimeout(() => {
        dispatch(removeNotification())
      }, time)
    }
    timingFunc()
  }
}

const showNotification = notification => {
  clearNotify()
  return {
    type: 'SEND_NOTIFICATION',
    data: notification,
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: null,
  }
}

export default notificationReducer
