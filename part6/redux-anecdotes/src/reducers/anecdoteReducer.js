import * as anecdoteServices from '../services/anecdotes'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTE':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
      const id = action.data.id
      const anectdoteToChange = state.find(
        anectdote => anectdote.id === id,
      )
      const changedAnecdote = {
        ...anectdoteToChange,
        votes: (anectdoteToChange.votes += 1),
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote,
      )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    })
  }
}

export const addVote = id => {
  return {
    type: 'ADD_VOTE',
    data: { id },
  }
}

export const createAnecdote = object => {
  return async dispatch => {
    const content = await anecdoteServices.createNew(object)
    console.log(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: content,
    })
  }
}

export default reducer
