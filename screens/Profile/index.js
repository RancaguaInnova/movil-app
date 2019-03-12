import { connect } from 'react-redux'
import Profile from './ProfileComponent'
import { requestSession, logout, updateProfile } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    requestSession: () => {
      dispatch(requestSession())
    },
    logout: sessionId => {
      dispatch(logout(sessionId))
    },
    updateProfile: userInput => {
      dispatch(updateProfile(userInput))
    },
  }
}

const mapStateToProps = state => {
  const { auth: { loading, session, error } } = state
  return {
    session,
    loading,
    error
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
