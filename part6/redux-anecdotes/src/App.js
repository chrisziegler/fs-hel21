import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes).sort(
    (a, b) => b.votes - a.votes,
  )
  const notification = useSelector(state => state.notifications)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification} />
      {anecdotes.map(anecdote => (
        <AnecdoteList anecdote={anecdote} key={anecdote.id} />
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
