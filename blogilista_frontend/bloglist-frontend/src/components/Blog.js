import React, { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [informationVisible, setInformationVisible] = useState(false)

  const hideWhenVisible = {
    display: informationVisible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {
    display: informationVisible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let deleteVisible = false

  if (blog.user.username === user.username) {
    deleteVisible = true
  } else {
    deleteVisible = false
  }
  // if (user === null) {
  //   deleteVisible = false
  // } else {
  //   if (blog.user === null) {
  //     deleteVisible = false
  //   } else if (blog.user.username === user.username) {
  //     deleteVisible = true
  //   } else {
  //     deleteVisible = false
  //   }
  // }

  const showWhenUserOwner = {
    display: deleteVisible ? '' : 'none',
  }


  return (
    <div>
      <div style={showWhenVisible}>
        <div onClick={() => setInformationVisible(false)}>

          <p>{blog.title} </p>
          <p>{blog.author} </p>
          <p>{blog.url} </p>
          <p>{blog.likes} likes <button onClick={() => addLike(blog)}>like</button> </p>
          <p> added by {blog.user.name} </p>
          <div style={showWhenUserOwner}>
            <button onClick={() => deleteBlog(blog)}>delete</button>
          </div>
        </div>
      </div>
      <div style={hideWhenVisible}>
        <div onClick={() => setInformationVisible(true)}>

          <p>{blog.title} </p>
        </div>
      </div>
    </div>
  )
}

export default Blog