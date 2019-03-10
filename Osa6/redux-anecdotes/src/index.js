import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdote_reducer, {initializeAnecdotes} from './reducers/anecdoteReducer'
import notification_reducer from './reducers/notificationReducer'
import filter_reducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import anecdoteService from './services/anecdotes'


const reducer = combineReducers({
  anecdotes: anecdote_reducer,
  notification: notification_reducer,
  filter: filter_reducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anec =>
    store.dispatch(initializeAnecdotes(anec))
  )

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)