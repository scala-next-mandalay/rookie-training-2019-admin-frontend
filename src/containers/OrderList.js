import { connect } from 'react-redux';
import OrderList from '../components/OrderList';
import {fetchAllOrders , setSearchText} from '../modules/orders';
import { fetchAllOrderItems } from '../modules/orderitems';

// const _filter = (rows, searchText) => {
//   console.log("searchtext:",searchText);
//   if (!searchText) {
//     return  rows;
//   }
//   else 
//   {
//     return searchText;
//   }
  
//   // const filteredRows = [];
//   // for (const n of rows) {
//   //   //filter by searchText.
//   //   if (searchText) {
//   //     if (n.first_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || n.last_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || (n.first_name+" "+n.last_name).toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || (n.first_name+n.last_name).toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || n.address1.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || n.address2.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || n.country.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || n.state.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //       || n.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//   //     ) {
//   //       filteredRows.push(n);
//   //     }
//   //   }
//   // }
//   // return filteredRows;
// };


export default connect(
  (state) => ({
    orders: state.orders.rows,
    searchText: state.orders.searchText,
  }),
  (dispatch) => ({
    setSearchText: (text) =>  dispatch(setSearchText(text)),
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    fetchAllOrderItems: (id) => dispatch(fetchAllOrderItems(id)),
  })
)(OrderList);