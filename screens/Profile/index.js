import { connect } from 'react-redux'
import Profile from './Profile'
import { getSession } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    getSession: () => {
      dispatch(getSession())
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
