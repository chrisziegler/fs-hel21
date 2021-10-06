import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    personService.getAll().then(initialNumbers => {
      setPersons(initialNumbers);
    });
  }, []);

  useEffect(() => {
    const results = persons.filter(person =>
      person.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilter(results);
  }, [searchTerm, persons]);

  const handleDelete = ({ id, name }) => {
    personService
      .remove(id)
      .then(window.confirm(`Delete ${name}?`));
    setPersons(persons.filter(person => person.id !== id));
  };

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
  );
};

export default App;
