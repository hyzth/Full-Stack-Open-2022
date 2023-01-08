import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          type='text'
          name='Username'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          name='Password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button id='login-button' type="submit">log in</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm