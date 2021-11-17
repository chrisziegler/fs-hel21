import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = id => {
    dispatch(addVote(id))
  }
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </>
  )
}

export default AnecdoteList
