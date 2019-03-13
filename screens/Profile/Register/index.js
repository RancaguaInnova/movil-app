import { connect } from 'react-redux'
import { register } from 'providers/StateProvider/Auth/actions'
import Registration from './Registration'

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, profile) => {
      dispatch(register(email, password, profile))
    },
  }
}

const mapStateToProps = state => {
  const {
    auth: { session, loading, error },
  } = state
  return {
    session,
    loading,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration)
