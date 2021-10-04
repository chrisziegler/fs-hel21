const Country = ({ country }) => {
  return (
    <>
      <h1> {country.name.common}</h1>
      <p> capital {country.capital}</p>
      <p> population {country.population}</p>
    </>
  );
};

export default Country;
