import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=f`,
      )
      .then(response => {
        setWeather(response.data.current);
      });
  }, [country.capital]);

  return (
    <>
      <h1> {country.name.common}</h1>
      <p>
        {' '}
        <strong>capital</strong> {country.capital}
      </p>
      <p>
        {' '}
        <strong>population</strong>{' '}
        {country.population.toLocaleString('en-US')}
      </p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        width="150"
        src={country.flags.svg}
        alt={country.demonyms.eng.m + ' flag image'}
        title={country.demonyms.eng.m + ' flag image'}
      />
      {weather && (
        <section>
          <h2>Weather in {country.capital}</h2>
          <p>
            <strong>temperature</strong> {weather.temperature}{' '}
            &#8457;
          </p>
          <img
            src={weather.weather_icons}
            alt="weather icon"
            title={weather.weather_descriptions + ' icon'}
          />
          <p>
            <strong>wind</strong> {weather.wind_speed}mph
            direction <em>{weather.wind_dir}</em>
          </p>
        </section>
      )}
    </>
  );
};

export default Country;
