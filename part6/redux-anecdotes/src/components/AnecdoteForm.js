import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import * as anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObj = { content }
    const newAnecdote = await anecdoteServices.createNew(anecdoteObj)
    dispatch(createAnecdote(newAnecdote))
    // console.log(newAnecdote)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit" className="btn_submit">
          create
        </button>
      </form>
    </>
  )
}

export default AnecdoteForm
