import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  sendNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = ({ id, content }) => {
    dispatch(addVote(id))
    dispatch(sendNotification('you voted ' + content))
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
