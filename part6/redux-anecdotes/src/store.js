import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
})

// console.log(store.getState())

export const store = createStore(reducer, composeWithDevTools())
