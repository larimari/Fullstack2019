import React from 'react'

const Filter = (props) => {
    return (
        <div>
        <form>
            <input onChange={props.handleFilterChange} />
        </form>
        </div>
    )
}

export default Filter