import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  sendNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = anecdote => {
    dispatch(addVote(anecdote))
    dispatch(sendNotification('you voted ' + anecdote.content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  )
}

export default AnecdoteList
