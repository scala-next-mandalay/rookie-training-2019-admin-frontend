import { connect } from 'react-redux';
import TitleBar from '../components/TitleBar';
import { signOut } from '../modules/auth';
import {setLocale} from '../modules/locale';

export default connect(
  (state) => ({
    locale: state.locale.locale
  }),
  (dispatch) => ({
    signOut: () => dispatch(signOut()),
    setLocale: (value) => dispatch(setLocale(value)) 
  })

)(TitleBar);