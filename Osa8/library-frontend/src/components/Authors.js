import React, { useState } from 'react'

const Authors = props => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const authors = props.result.data.allAuthors || []
  const token = localStorage.getItem('libraryUserLogin')

  if (!props.show) {
    return null
  }
  console.log('authorin propsit', props)

  const submit = async event => {
    event.preventDefault()
    await props.editAuthor({
      variables: { name, setBornTo: birthYear }
    })

    setName('')
    setBirthYear('')
  }

  console.log('authors', authors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && 
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <select value={name} onChange={({target}) => setName(target.value)}>
                <option>Choose</option>
                {authors.map(author => {
                  return (
                    <option key={author.name} value={author.name}>{author.name}</option>
                  )
                })}
              </select>
            </div>
            <div>
              <input 
                value={birthYear} 
                onChange={({target}) => setBirthYear(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>}
    </div>
  )
}
export default Authors
