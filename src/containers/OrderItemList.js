import { connect } from 'react-redux';
import OrderItemList from '../components/OrderItemList';
// const _getOrderItemsByOrder = (rows, OrderId) => {
//   console.log("click Id:" ,OrderId);
//   if (OrderId <= 0) {
//     return rows;
//   }
//   else {
//     const newRows = rows.filter(t => t.order_id === Number(OrderId));
//     console.log('_getOrderItemsByCategory2', newRows);
//     return newRows;
//   }
// };

export default connect(
 
  (state) => ({
    orderitems: state.orderitems.rows,
    loading: state.orderitems.loading,
  })
)(OrderItemList);