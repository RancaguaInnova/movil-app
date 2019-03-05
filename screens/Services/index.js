import { connect } from 'react-redux'
import Services from './ServicesComponent'
import { services } from 'providers/StateProvider/Services/actions'

const mapDispatchToProps = dispatch => {
  return {
    getServices: () => {
      dispatch(services())
    }
  }
}

const mapStateToProps = state => {
  const { auth: { session }, services: { services, loading, error } } = state
  return {
    session,
    services,
    loading,
    error
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services)
