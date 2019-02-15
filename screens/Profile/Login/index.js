import { connect } from 'react-redux'
import { login } from 'providers/StateProvider/Auth/actions';
import Login from './login';

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
