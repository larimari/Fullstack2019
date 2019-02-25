import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  title,
  author,
  url
}) => {
  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
  }
  return (
    < div >
      <h3> Create new blog </h3>
      <form onSubmit={addBlog}>
        <p> Title  <input {...title} /></p>
        <p> Author  <input {...author}/></p>
        <p> Url  <input {...url} /> </p>
        <button type="submit">save</button>
      </form>
    </div >
  )
}

export default BlogForm