const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_NOTIFICATION':
      return { ...state, message: action.data }
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const sendNotification = message => {
  return {
    type: 'SEND_NOTIFICATION',
    data: message,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: null,
  }
}

export default notificationReducer
