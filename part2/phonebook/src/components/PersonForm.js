import { useState } from 'react';

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handleNameInput = e => {
    setNewName(e.target.value);
  };
  const handleNumberInput = e => {
    setNewNumber(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const nameObject = { name: newName, number: newNumber };
    // Check if name is already in use
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    } else {
      window.alert(`${newName} is already added to phonebook`);
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
