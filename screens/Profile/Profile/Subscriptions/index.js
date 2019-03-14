import { connect } from 'react-redux'
import Subscriptions from './SubscriptionsComponent'
import { registerDevice } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    registerDevice: (userId, token) => {
      dispatch(registerDevice(userId, token))
    }
  }
}

const mapStateToProps = state => {
  const { auth: { loading, session, error } } = state
  return {
    userId: session.userId,
    loading,
    error
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions)
