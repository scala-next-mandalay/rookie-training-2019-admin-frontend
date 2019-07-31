import axios from 'axios';
import { URL_GET_ORDERITEMS } from '../constants';
import format from 'string-format';

const initialState = {
  rows: [],
  loading: false
};

//=============================================================================
//Reducer
//=============================================================================
export const orderitemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDERITEMS_FETCH_BEGIN':
      return {
        ...state,
        rows: [],
        loading: true
      };
    case 'FETCH_ORDERITEMS_DONE':
      console.log('FETCH_ORDERITEMS_DONE', action.payload[1]);
      return {
        ...state,
        rows: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

//=============================================================================
//ActionCreators
//=============================================================================
export const fetchAllOrderItems = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERITEMS_FETCH_BEGIN'
    });
    
    //for (const orderRow of  getState().orders.rows) {
     // if (orderRow.id === orderId) {
        //search
        const url = format(URL_GET_ORDERITEMS, orderId);
        const axRes = await axios.get(url);
    
        dispatch({
          type: 'FETCH_ORDERITEMS_DONE',
          payload:  axRes.data.data
        });
        //break;
      //}
    //}
  };
};
