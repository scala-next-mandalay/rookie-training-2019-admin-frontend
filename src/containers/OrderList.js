import { connect } from 'react-redux';
import OrderList from '../components/OrderList';
import {fetchAllOrders ,setOrderId, setSearchText, clickOrderId} from '../modules/orders';
import { fetchAllOrderItems } from '../modules/orderitems';

const _filter = (rows, orderId, searchText) => {
  console.log("searchtext:",searchText);
  if (!searchText && !orderId) {
    return  rows;
  }
  
  const filteredRows = [];
  for (const n of rows) {
    //filter by searchText.
    if (searchText) {
      if (n.first_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || n.last_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || (n.first_name+" "+n.last_name).toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || (n.first_name+n.last_name).toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || n.address1.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || n.address2.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || n.country.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || n.state.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || n.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      ) {
        filteredRows.push(n);
      }
    }
    
    
    //filter by orderId
    if (orderId > 0) {
      if (n.id === Number(orderId)) {
        filteredRows.push(n);
      }
    }
  }
  return filteredRows;
};


export default connect(
  (state) => ({
    orders: _filter(
      state.orders.rows, 
      state.orders.selectedOrderId,
      state.orders.searchText,
    ),
    searchText: state.orders.searchText,
  }),
  (dispatch) => ({
    setSearchText: (text) =>  dispatch(setSearchText(text)),
    setOrderId: (orderId) =>  dispatch(setOrderId(orderId)),
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    clickOrderId :(orderId) => dispatch(clickOrderId(orderId)),
    fetchAllOrderItems: (id) => dispatch(fetchAllOrderItems(id)),
  })
)(OrderList);