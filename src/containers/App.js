import { connect } from 'react-redux';
import App from '../components/App';
import { fetchAllCategories } from '../modules/categories';
import { fetchAllCustomers } from '../modules/customers';
import { fetchAllItems } from '../modules/items';
import { fetchAllOrders } from '../modules/orders';
import { fetchAllOrderItems } from '../modules/orderitems';
import { fetchAuthedUser, refreshToken } from '../modules/auth'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    dialogOpened: state.auth.dialogOpened,
    user: state.auth.user,
    loading: state.auth.loading
  }),
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllCustomers: () => dispatch(fetchAllCustomers()),
    fetchAllItems: () => dispatch(fetchAllItems()),
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    fetchAllOrderItems: () => dispatch(fetchAllOrderItems()),
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    refreshToken: () => dispatch( refreshToken() )
  })
)(App);