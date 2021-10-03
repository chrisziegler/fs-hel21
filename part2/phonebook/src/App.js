import { useState } from 'react';

const Numbers = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

// const Search = ({persons}) => {

// }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [matches, setMatches] = useState('');

  const handleNameInput = e => {
    setNewName(e.target.value);
  };
  const handleNumberInput = e => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameObject = { name: newName, number: newNumber };
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  };

  const handleSearch = e => {
    setMatches(e.target.value);
    const matched = persons.filter(person =>
      person.name.toLowerCase().includes(newName.toLowerCase()),
    );

    console.log(matched);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <input onChange={handleSearch} value={matches} />
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Numbers key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
