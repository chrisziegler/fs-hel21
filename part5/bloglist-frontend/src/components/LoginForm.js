import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  handleSubmit,
  errorMessage,
  successMessage,
  username,
  password,
  setPassword,
  setUsername,
}) => {
  return (
    <div>
      <h1>
        bl<span style={{ color: 'thistle' }}>o</span>gs
      </h1>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginTop: '2em' }}>blogs login</h3>
        <Notification
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <div className="form">
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form">
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="button login" type="submit">
          submit
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
}

export default LoginForm
