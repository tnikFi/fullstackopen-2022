import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Stat = (props) => <div>{props.text} {props.count}</div>

const App = () => {
  // Each button will use its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (value, setter) => () => setter(value + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={increment(good, setGood)} />
      <Button text="neutral" onClick={increment(neutral, setNeutral)} />
      <Button text="bad" onClick={increment(bad, setBad)} />
      <h1>statistics</h1>
      <Stat text="good" count={good} />
      <Stat text="neutral" count={neutral} />
      <Stat text="bad" count={bad} />
    </div>
  )
}

export default App