import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (props) => {
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.addAnecdote.value
        const newAnec = await anecdoteService.createNew(content)
        props.createAnecdote(newAnec.content)
        
        props.createNotification('Luotu uusi anecdote')

        setTimeout(() =>
            props.createNotification('')
            , 5000)

        event.target.addAnecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='addAnecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

// const mapDispatchToProps = dispatch => {
//     return {
//         createAnecdote: value => {
//             dispatch(createAnecdote(value))
//         },
//         createNotification: value => {
//             dispatch(createNotification(value))
//         }
//     }
// }
const mapDispatchToProps = {
    createAnecdote,
    createNotification
}
export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
