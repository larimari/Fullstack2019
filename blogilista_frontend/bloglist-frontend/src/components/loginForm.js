import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div> käyttäjätunnus  <input
          value={username}
          onChange={handleUsernameChange}/>
        </div>
        <div>salasana  <input
          type="password"
          value={password}
          onChange={handlePasswordChange}/>
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm