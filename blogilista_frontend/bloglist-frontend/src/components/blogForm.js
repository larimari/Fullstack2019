import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = ({ addBlog, title, author, url }) => {
  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
  }
  return (
    <div>
      <h3> Create new blog </h3>
      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>
            Title <input {...title} />
          </label>
          <label>
            Author <input {...author} />
          </label>
          <label>
            Url <input {...url} />{' '}
          </label>
        </Form.Field>
        <Button type="submit">save</Button>
      </Form>
    </div>
  )
}

export default BlogForm
