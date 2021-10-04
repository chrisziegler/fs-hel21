import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('sweden');

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div>
        <strong>find countries</strong>
        <input type="text" onChange={handleSearch}></input>

        {countries.length === 1 ? (
          countries.map(country => (
            <Country key={country.ccn3} country={country} />
          ))
        ) : countries.length > 1 && countries.length <= 10 ? (
          countries.map(country => (
            <Countries key={country.ccn3} country={country} />
          ))
        ) : (
          <p>
            Too many ({countries.length}) matches, specify
            another filter
          </p>
        )}
      </div>
    </>
  );
}

export default App;
