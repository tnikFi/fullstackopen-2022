import { useState } from 'react'

const VoteCounter = ({selected, votes}) => {
  const voteCount = votes[selected] ? votes[selected] : 0
  return (
    // Return 'has 1 vote' if voteCount is 1, else 'has n votes' 
    <p>Has {voteCount} {(voteCount === 1) ? 'vote' : 'votes'}</p>
  )
}

const MostPopularAnecdote = ({anecdotes, votes}) => {
  const largestIndex = Object.keys(votes).reduce((max, current) => votes[current] > votes[max] ? current : max, 0)
  return (
    <>
      <p>{anecdotes[largestIndex]}</p>
      <VoteCounter selected={largestIndex} votes={votes} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const selectRandomAnecdote = () => {
    setSelected(Math.round(Math.random() * (anecdotes.length - 1)))
  }

  const voteForAnecdote = () => {
    // Using a ternary operator here because every vote count is undefined
    // by default and therefore performing math on it would return NaN
    const votesCopy = {...votes}
    votesCopy[selected] ? votesCopy[selected] ++ : votesCopy[selected] = 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <VoteCounter selected={selected} votes={votes} />
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostPopularAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App