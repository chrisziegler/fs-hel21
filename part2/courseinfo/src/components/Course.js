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
    <>
      <div>
        {parts.map(part => (
          <Part
            key={part.id}
            name={part.name}
            exercises={part.exercises}
          />
        ))}
      </div>
      <Total parts={parts} />
    </>
  );
};

const Part = ({ name, exercises, id }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => (
  <strong>
    Number of exercises{' '}
    {parts.reduce((prev, curr) => {
      return prev + curr.exercises;
    }, 0)}
  </strong>
);

export default Course;
