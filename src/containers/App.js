import { connect } from 'react-redux';
import App from '../components/App';
import { fetchAllCategories } from '../modules/categories';
import { fetchAuthedUser,refreshToken } from '../modules/auth';

export default connect(
  (state) => ({
    user: state.auth.user,
    authState: state.auth.authState,
    locale: state.locale.locale
  }),
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    refreshToken: () => dispatch( refreshToken() )
  })
)(App);