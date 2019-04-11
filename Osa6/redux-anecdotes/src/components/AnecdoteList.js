import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (id) => {
    const voted = props.anecdotesToShow.find(a => a.id === id)
    props.voteAnecdote(voted)
    props.setNotification(`you voted '${voted.content}'`, 10)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotesToShow.map(anecdote => (
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

const mapStateToProps = (state) => {
  const anecdotesToShow = state.filter.length > 0 ?
    state.anecdotes.filter(a => a.content.includes(state.filter)) :
    state.anecdotes

  return {
    anecdotesToShow
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  clearNotification, 
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)


/* import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    const voted = props.anecdotesToShow.find(a => a.id === id)
    props.voteAnecdote(voted)
    props.setNotification(`you voted '${voted.content}'`, 10)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const anecdotesToShow = state.filter.length > 0 ?
    state.anecdotes.filter(a => a.content.includes(state.filter)) :
    state.anecdotes

  return {
    anecdotesToShow
  }
}

export default connect(mapStateToProps, {
  setNotification, clearNotification, voteAnecdote 
})(AnecdoteList) */