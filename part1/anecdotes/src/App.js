import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const MostVotes = (props) => {
  const index = props.votes.indexOf(Math.max(...props.votes))
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[index]}</div>
      <div>has {props.votes[index]} votes</div>
    </div>
  )
}

const Anecdote = (props) => (
  <div>
    <h1>Anecdote of the day</h1>
    <div>{props.content}</div>
    <div>has {props.votes} votes</div>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const generateRandomNumber = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  return (
    <div>
      <Anecdote content={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={generateRandomNumber} text='next anecdote' />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App