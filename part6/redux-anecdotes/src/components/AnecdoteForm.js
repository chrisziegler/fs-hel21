import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObj = { content, votes: 0 }
    props.createAnecdote(anecdoteObj)
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

export default connect(null, { createAnecdote })(AnecdoteForm)
