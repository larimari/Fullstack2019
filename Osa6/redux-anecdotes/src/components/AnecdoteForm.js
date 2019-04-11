import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const create = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.setNotification(`anecdote ${content} created`, 5)
  }
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={create}>
          <div>
            <input name="content" />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  clearNotification
}
export default connect(null, mapDispatchToProps)(AnecdoteForm)

/* import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value 
    event.target.content.value = ''
    props.createAnecdote(content)
    props.setNotification(`anecdote ${content} created`, 5)
  }

  return (
    <form onSubmit={create}>
      <div>
        <input name='content' />
      </div>
      <button>create</button>
    </form>
  )
}

export default connect(null, {
  createAnecdote, setNotification, clearNotification
})(AnecdoteForm) */
