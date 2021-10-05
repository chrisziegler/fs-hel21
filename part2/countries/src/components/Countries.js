const Countries = ({ country, setSearchTerm }) => {
  const handleShow = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {country.name.common}
      <button onClick={handleShow} value={country.name.common}>
        show
      </button>
    </div>
  );
};

export default Countries;
