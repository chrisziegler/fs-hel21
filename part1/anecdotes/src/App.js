import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const rng = max => {
    return Math.floor(Math.random() * max);
  };

  const values = Object.values(points);
  console.log(values);
  const max = Math.max(...values);
  const maxIndex = values.indexOf(max);

  const handleNext = () => {
    const random = rng(anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const update = { ...points };
    update[selected] += 1;
    setPoints(update);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
    </>
  );
};

export default App;
