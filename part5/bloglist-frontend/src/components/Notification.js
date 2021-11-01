const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }
  return <div className="success">{successMessage}</div>
}

export default Notification
