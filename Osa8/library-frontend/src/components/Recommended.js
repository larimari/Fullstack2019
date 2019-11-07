import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const Recommended = props => {
  const ME = gql`
    {
      me {
        username
        favouriteGenre
      }
    }
  `
  if (!props.show) {
    return null
  }

  const result = useQuery(ME)
  console.log(result)
  
  if (!result.data.me) {
    return <div>Please load page!</div>
  }

  if (!result.data.me.favouriteGenre) {
    return <div>You don't have favorite genre! </div>
  }
  const filterBooks = props.result2.data.allBooks.filter(b =>
    b.genres.includes(props.result.data.me.favouriteGenre)
  )

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre:
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map(a => {
            const author = a.author ? a.author : { name: '' }
            return (<tr key={a.title}>
              <td>{a.title}</td>
              <td>{author.name}</td>
              <td>{a.published}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Recommended
