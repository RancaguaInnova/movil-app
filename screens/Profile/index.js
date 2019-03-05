import { connect } from 'react-redux'
import Profile from './ProfileComponent'
import { requestSession, logout } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    requestSession: () => {
      dispatch(requestSession())
    },
    logout: sessionId => {
      dispatch(logout(sessionId))
    }
  }
}

const mapStateToProps = state => {
  const { auth: { loading, session } } = state
  return {
    session,
    loading
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
