const Persons = ({ person, handleDelete, isShown }) => {
  return (
    <li>
      {person.name} {person.number}
      <button
        className="delete"
        onClick={() => handleDelete(person)}
      >
        X
      </button>
    </li>
  );
};

export default Persons;
