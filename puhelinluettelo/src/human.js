import React from 'react'

const Human = (props) => {
  return (
    <li>{props.person.name} {props.person.number}
      <button onClick={() => props.deletePerson(props.name)}>
        poista
      </button>
    </li>
  )
}

export default Human