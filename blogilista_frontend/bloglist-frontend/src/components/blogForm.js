import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange
}) => {
  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newAuthor: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired
  }
  return (
    < div >
      <h3> Create new blog </h3>
      <form onSubmit={addBlog}>
        <p> Title  <input
          value={newTitle}
          onChange={handleTitleChange} /></p>
        <p> Author  <input
          value={newAuthor}
          onChange={handleAuthorChange}/></p>
        <p> Url  <input
          value={newUrl}
          onChange={handleUrlChange} /> </p>
        <button type="submit">save</button>
      </form>
    </div >
  )
}

export default BlogForm