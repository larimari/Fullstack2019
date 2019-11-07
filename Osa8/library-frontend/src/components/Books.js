import React, { useState } from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }
  
  console.log('booksin propsit', props)

  const [bookState, setBookState] = useState([])

  const allBooks = props.result.data.allBooks
  const books = bookState.length < 1 ? props.result.data.allBooks : bookState

  if (props.result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            const author = a.author ? a.author : { name: '' }
            return (<tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}

export default Books