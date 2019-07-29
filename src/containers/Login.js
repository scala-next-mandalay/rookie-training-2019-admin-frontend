import { connect } from 'react-redux';
import Login from '../components/Login';
import { changeAuthState, signOut } from '../modules/auth';

export default connect(
  (state) => ({
    authState: state.auth.authState,
    dialogOpened: state.auth.dialogOpened,
    user: state.auth.user,
    loading: state.auth.loading
  }),
  
  (dispatch) => ({
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    signOut: () => dispatch(signOut()),
  })
)(Login);