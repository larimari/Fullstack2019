import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const { anecdotes, filter } = store.getState()

    const sortAnecd = () => {
        anecdotes.sort(function (a, b) {
            return b.likes - a.likes
        })
        console.log(anecdotes)
        console.log('filter', filter)
        return anecdotes.filter(s => s.content.includes(filter))
    }

    const vote = (id) => {
        store.dispatch(voteAnecdote(id))
        store.dispatch(createNotification('Vote lisätty'))

        setTimeout(() =>
            store.dispatch(createNotification(''))
            , 5000)

    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortAnecd().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => (vote(anecdote.id))}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default AnecdoteList
