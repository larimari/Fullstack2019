import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    anecdoteService
      .getAll().then(anec => props.initializeAnecdotes(anec))
  },[])
  
  return (
    <div>
      <Notification store={props.store} />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)