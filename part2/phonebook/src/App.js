import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }
  return <div className="success">{successMessage}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialNumbers => {
      setPersons(initialNumbers)
    })
  }, [persons])

  useEffect(() => {
    const results = persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilter(results)
  }, [searchTerm, persons])

  const handleDelete = ({ id, name }) => {
    personService.remove(id).then(window.confirm(`Delete ${name}?`))
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <ul>
        {filter.map(person => (
          <Persons
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
