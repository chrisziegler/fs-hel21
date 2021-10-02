import { useState } from 'react';

const StatisticLine = ({ text, value, percent }) => {
  if (percent) {
    return (
      <>
        <td>{text}</td>
        <td>{value}%</td>
      </>
    );
  } else {
    return (
      <>
        <td>{text}</td>
        <td>{value}</td>
      </>
    );
  }
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const avgFormat = avg
    ? Math.round(avg * 100) / 100
    : 'no score';
  // const avg = (good - bad) / all;
  const positive = (Math.round((good / all) * 100) * 100) / 100;
  if (all) {
    return (
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={all} />
          </tr>
          <tr>
            <StatisticLine text="average" value={avgFormat} />
          </tr>
          <tr>
            <StatisticLine
              text="positive"
              value={positive}
              percent="true"
            />
          </tr>
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = rating => () => {
    if (rating === 'good') {
      setGood(good + 1);
    } else if (rating === 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={handleClick('good')} />
      <Button
        text="neutral"
        handleClick={handleClick('neutral')}
      />
      <Button text="bad" handleClick={handleClick('bad')} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
