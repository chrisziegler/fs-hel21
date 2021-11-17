import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state).sort(
    (a, b) => b.votes - a.votes,
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <AnecdoteList anecdote={anecdote} key={anecdote.id} />
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
