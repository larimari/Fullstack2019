import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div> käyttäjätunnus  <input
          {...username}/>
        </div>
        <div>salasana  <input
          {...password}/>
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm