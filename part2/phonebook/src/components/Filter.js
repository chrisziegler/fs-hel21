const Filter = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return <input value={searchTerm} onChange={handleSearch} />;
};

export default Filter;
