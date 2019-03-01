import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({store}) => {
    const anecdotes = store.getState()

    const sortAnecd = () => {
        anecdotes.sort(function (a, b) {
            return b.likes - a.likes
        })
        return anecdotes
    }

    return (
        <div>
        {sortAnecd().map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => store.dispatch(voteAnecdote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
        </div>
      )

}

export default AnecdoteList