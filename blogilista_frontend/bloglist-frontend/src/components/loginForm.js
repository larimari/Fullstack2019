import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}
export default LoginForm