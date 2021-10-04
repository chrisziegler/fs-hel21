import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const results = persons.filter(person =>
      person.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilter(results);
  }, [searchTerm, persons]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {filter.map(person => (
        <Persons key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
