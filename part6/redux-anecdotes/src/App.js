import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const filteredResults = useSelector(state => state.filter)

  let anecdotes = useSelector(state => state.anecdotes).sort(
    (a, b) => b.votes - a.votes,
  )

  if (filteredResults) {
    anecdotes = anecdotes.filter(anecdote =>
      anecdote.content.includes(filteredResults),
    )
  }
  // console.log(filtered)
  const notification = useSelector(state => state.notifications)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification} />
      <Filter />
      {anecdotes.map(anecdote => (
        <AnecdoteList anecdote={anecdote} key={anecdote.id} />
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
