import { connect } from 'react-redux'
import Profile from './ProfileComponent'
import { requestSession } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    requestSession: () => {
      dispatch(requestSession())
    }
  }
}

const mapStateToProps = state => {
  console.log('state:', state)
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
