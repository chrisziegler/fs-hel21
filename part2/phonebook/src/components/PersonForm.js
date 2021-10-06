import { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameInput = e => {
    setNewName(e.target.value);
  };
  const handleNumberInput = e => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const nameObject = { name: newName, number: newNumber };
    // Check if name is already in use
    if (!persons.some(person => person.name === newName)) {
      let returnedPerson = await personService.create(
        nameObject,
      );
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    } else {
      window.confirm(
        `${newName} is already added to phonebook, replace old numer with a new one?`,
      );
      const { id } = persons.find(
        person => person.name === nameObject.name,
      );

      let updatedPerson = await personService.update(
        nameObject,
        id,
      );
      setPersons(
        persons.map(person =>
          person.id !== id ? person : updatedPerson,
        ),
      );
      setNewName('');
      setNewNumber('');
    }
  };

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
  );
};

export default PersonForm;
