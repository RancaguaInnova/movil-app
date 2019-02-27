import { connect } from 'react-redux'
import Profile from './Profile';

const mapDispatchToProps = dispatch => {
  return {
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
)(Profile)
