import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Vote = ({vote}) => {
  return(
    <div>
      Voted {vote}
    </div>
  )
}
  

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(6))
  const random = Math.floor(Math.random() * 5)

  const handleClick =() => {
    setSelected(random)
  }

  const handleVoteClick =() => {
    const copy = [...vote]
    copy[random] += 1
    setVote(copy)
  }

  return (
    <div>
      
      {props.anecdotes[selected]}
      <p></p>
      <Vote vote={vote} />
      <p></p>
      <Button
        handleClick={handleClick}
        text='Next anecdote'
      />

      <Button
        handleClick={handleVoteClick}
        text='Vote'
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)