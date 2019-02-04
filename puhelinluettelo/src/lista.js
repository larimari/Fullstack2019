import React from 'react'

const Lista = (props) => {
    return (
        {lista.map(person => 
            <div key={person.name}>
                {person.name} {person.number}
            </div>)}
    )
}

export default Lista