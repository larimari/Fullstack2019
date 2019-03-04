import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, voteAnecdote, createNotification }) => {


  const vote = id => {
    voteAnecdote(id)
    createNotification('Vote lisätty')

    setTimeout(() => createNotification(''), 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const anecdotesToShow = state => {
  return state.anecdotes
    .filter(s => s.content.includes(state.filter))
    .sort(function(a, b) {
      return b.likes - a.likes
    })
}

const mapStateToProps = state => {
  return {
    anecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  createNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
