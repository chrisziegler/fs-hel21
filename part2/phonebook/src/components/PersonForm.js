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

  // const nullUtility = message => {
  //   setNewName('')
  //   setNewNumber('')
  //   setTimeout(() => {
  //     message(null)
  //   }, 500)
  // }

  const handleNameInput = e => {
    setNewName(e.target.value)
  }
  const handleNumberInput = e => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const nameObject = { name: newName, number: newNumber }
    // if name is unique ...
    let exists = persons.some(
      p => p.name.toLowerCase() === newName.toLowerCase(),
    )
    console.log('exists?:', exists)
    if (!exists) {
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
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else if (exists) {
      const confirmed = window.confirm(
        `'${newName}' already exists, replace phone number?`,
      )
      if (confirmed === false) {
        setNewName('')
        setNewNumber('')
        return
      }

      const { id } = persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase(),
      )
      console.log('id:', id)
      personService
        .update(nameObject, id)
        .then(updatedPerson => {
          // 2 browser case, with person deleted in 1, then # update attempted in 2
          if (updatedPerson === null) {
            throw new Error(`'${newName}' was already removed from server`)
          } else {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : updatedPerson,
              ),
            )
            setSuccessMessage(`Updated the entry`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }
        })
        .catch(error => {
          setErrorMessage(error.message)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
            personService.getAll().then(p => {
              setPersons(p)
            })
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
