import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    const results = countries.filter(country =>
      country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm, countries]);

  const handleInput = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div>
        <strong>find countries</strong>
        <input onChange={handleInput} value={searchTerm}></input>

        {searchResults.length === 1 ? (
          searchResults.map(country => (
            <Country key={country.ccn3} country={country} />
          ))
        ) : searchResults.length > 1 &&
          searchResults.length <= 10 ? (
          searchResults.map(country => (
            <Countries
              key={country.ccn3}
              country={country}
              setSearchTerm={setSearchTerm}
            />
          ))
        ) : (
          <p>
            Too many ({searchResults.length}) matches, specify
            another filter
          </p>
        )}
      </div>
    </>
  );
}

export default App;
