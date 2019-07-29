import { connect } from 'react-redux';
import App from '../components/App';
import { fetchAllCategories } from '../modules/categories';
import { fetchAuthedUser } from '../modules/auth'

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAuthedUser: () => dispatch(fetchAuthedUser())
  })
)(App);