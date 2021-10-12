import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({
  persons,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInput = e => {
    setNewName(e.target.value)
  }
  const handleNumberInput = e => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const nameObject = { name: newName, number: newNumber }
    // if name is unique ...
    if (!persons.some(person => person.name === newName)) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage('1 ' + error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      window.confirm(
        `${newName} is already added to phonebook,h replace old number with a new one?`,
      )
      const { id } = persons.find(person => person.name === newName)
      personService
        .update(nameObject, id)
        .then(updatedPerson => {
          setPersons(
            persons.map(person =>
              person.id !== id ? person : updatedPerson,
            ),
          )
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Updated the phone number for ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <form>
      <div>
        name:
        <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
