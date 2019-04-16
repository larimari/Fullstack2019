import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label> <input {...username} />
        </Form.Field>
        <Form.Field>
          <label>Password</label> <input {...password} />
        </Form.Field>
        <Button type="submit">log in</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
export default LoginForm
