import { connect } from 'react-redux'
import { login } from 'providers/StateProvider/Auth/actions'
import Login from './LoginComponent'

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

const mapStateToProps = state => {
  const { auth: { session, loading } } = state
  return {
    session,
    loading
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
