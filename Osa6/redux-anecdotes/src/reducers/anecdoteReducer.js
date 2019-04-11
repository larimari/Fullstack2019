import anecdoteService from '../services/anecdotes'

const byVotes = (b1, b2) => b2.votes - b1.votes

const reducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    return state
      .map(a => (a.id !== action.data.id ? a : action.data))
      .sort(byVotes)
  } else if (action.type === 'ADD') {
    return state.concat(action.data).sort(byVotes)
  } else if (action.type === 'INITIALIZE') {
    return action.data.sort(byVotes)
  }

  return state
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = {
      content,
      votes: 0
    }
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      data: newAnecdote,
      type: 'ADD'
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const data = await anecdoteService.update(voted)
    dispatch({
      data,
      type: 'VOTE'
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      data,
      type: 'INITIALIZE'
    })
  }
}

export default reducer

/* import anecdoteService from '../services/anecdotes'

const byVotes = (b1, b2) => b2.votes - b1.votes

const reducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    return state
      .map(a => a.id !== action.data.id ? a : action.data)
      .sort(byVotes)
  } else if (action.type === 'ADD') {
    return state.concat(action.data).sort(byVotes)
  } else if (action.type === 'INITIALIZE') {
    return action.data.sort(byVotes)
  }

  return state
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = {
      content,
      votes: 0
    }
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      data: newAnecdote,
      type: 'ADD'
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      data,
      type: 'INITIALIZE'
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const data = await anecdoteService.update(voted)
    dispatch({
      data,
      type: 'VOTE'
    })
  }
  
}

export default reducer */
