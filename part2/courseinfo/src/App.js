const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ course: { parts } }) => {
  return (
    <ul>
      {parts.map(part => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
    </ul>
  );
};

const Part = ({ name, exercises, id }) => (
  <li>
    {name} {exercises}
  </li>
);

// const Total = ({ parts }) => (
//   <p>
//     Number of exercises{' '}
//     {parts[0].exercises +
//       parts[1].exercises +
//       parts[2].exercises}
//   </p>
// );

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};
export default App;
