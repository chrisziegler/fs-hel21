const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.keyword
    default:
      return state
  }
}

export const filterChange = keyword => {
  return {
    type: 'SET_FILTER',
    keyword,
  }
}

export default filterReducer
