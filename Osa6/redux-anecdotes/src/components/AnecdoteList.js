import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, filter, voteAnecdote, createNotification }) => {

    const sortAnecd = () => {
        anecdotes.sort(function (a, b) {
            return b.likes - a.likes
        })

        return anecdotes.filter(s => s.content.includes(filter))
    }

    const vote = (id) => {
        voteAnecdote(id)
        createNotification('Vote lisätty')

        setTimeout(() =>
            createNotification('')
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    createNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)