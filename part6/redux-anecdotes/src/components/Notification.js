import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'rgb(196, 252, 252)',
  }
  if (props.notifications === null) {
    return null
  }

  return <div style={style}>{props.notifications.message}</div>
  // return <div style={style}>'hello'</div>
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    notifications: state.notifications,
    filter: state.filter,
  }
}

export default connect(mapStateToProps)(Notification)
