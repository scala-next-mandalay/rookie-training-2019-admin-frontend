import { connect } from 'react-redux';
import TitleBar from '../components/TitleBar';
import { signOut } from '../modules/auth';

export default connect(
  null,
  (dispatch) => ({
    signOut: () => dispatch(signOut()),
  })

)(TitleBar);