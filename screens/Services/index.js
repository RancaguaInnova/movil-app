import { connect } from 'react-redux'
import Services from './ServicesComponent'

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
  // mapDispatchToProps
)(Services)
