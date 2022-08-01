import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatLine = ({text, value, unit}) => {
  // Automatically round the value to one decimal place
  const rounded = Math.round(value * 10) / 10
  
  return (
    <tr>
      <td>{text}</td>
      <td>{rounded} {unit}</td>
    </tr>
  )
}

const Stats = (props) => props.total ? <>
    <table>
      <tbody>
        <StatLine text="good" value={props.good} />
        <StatLine text="neutral" value={props.neutral} />
        <StatLine text="bad" value={props.bad} />
        <StatLine text="all" value={props.total} />
        <StatLine text="average" value={props.score/props.total} />
        <StatLine text="positive" value={(props.good/props.total)*100} unit="%" />
      </tbody>
    </table>
  </> : <p>No feedback given</p>

const App = () => {
  // Each button will use its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const score = good - bad
  const total = good + neutral + bad

  const increment = (value, setter) => () => setter(value + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={increment(good, setGood)} />
      <Button text="neutral" onClick={increment(neutral, setNeutral)} />
      <Button text="bad" onClick={increment(bad, setBad)} />
      <h1>statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} score={score} total={total} />
    </div>
  )
}

export default App