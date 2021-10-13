import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({
  persons,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [newEntry, setNewEntry] = useState({
    name: '',
    number: '',
  })

  const handleNameInput = e => {
    setNewEntry({ ...newEntry, name: e.target.value })
  }

  const handleNumberInput = e => {
    setNewEntry({ ...newEntry, number: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const nameObject = { name: newEntry.name, number: newEntry.number }
    let inDB = persons.some(
      p => p.name.toLowerCase() === newEntry.name.toLowerCase(),
    )
    // if input name is unique ...
    if (!inDB) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewEntry({ name: '', number: '' })
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      // input name  exits - update confirmation
    } else if (inDB) {
      const confirmed = window.confirm(
        `'${newEntry.name}' already exists, replace phone number?`,
      )
      // 'Cancel' pop-up
      if (confirmed === false) {
        setNewEntry({ name: '', number: '' })
        return
      }
      // 'Enter' pop-up
      const { id } = persons.find(
        person =>
          person.name.toLowerCase() === newEntry.name.toLowerCase(),
      )
      personService
        .update(nameObject, id)
        .then(updatedPerson => {
          // multi-tab browser case, with entry deleted in 1, then # update attempted in the other
          if (updatedPerson === null) {
            throw new Error(
              `'${newEntry.name}' was already removed from server`,
            )
            // normal update response
          } else {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : updatedPerson,
              ),
            )
            setSuccessMessage(`Updated the number`)
            setNewEntry({ name: '', number: '' })
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }
        })
        .catch(error => {
          setErrorMessage(error.message)
          setNewEntry({ name: '', number: '' })
          setTimeout(() => {
            setErrorMessage(null)
            personService.getAll().then(people => {
              setPersons(people)
            })
          }, 5000)
        })
    }
  }

  return (
    <form>
      <div>
        name:
        <input value={newEntry.name} onChange={handleNameInput} />
      </div>
      <div>
        number:
        <input value={newEntry.number} onChange={handleNumberInput} />
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
