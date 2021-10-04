import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
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
