import { connect } from 'react-redux'
import Home from './HomeComponent'
import { requestSession } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    requestSession: () => {
      dispatch(requestSession())
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
)(Home)
