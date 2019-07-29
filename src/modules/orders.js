import axios from 'axios';
import { URL_GET_ALL_ORDERS,URL_SEARCH_ORDER } from '../constants';
import format from 'string-format';

const initialState = {
  alreadyFetched: false,
  selectedOrderId: null,
  searchText: '',
  rows: [],
  clickedOrderId : '',
};

//=============================================================================
//Reducer
//=============================================================================
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      };
    case 'FETCH_ORDERS_DONE':
      return {
        ...state,
        rows: action.payload
      };
    case 'ORDER_SET_BY_ID':
      console.log('clicked id : ',action.payload);
      return {
        ...state,
        selectedOrderId: action.payload
      };
    case 'ORDER_SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload
      };
    case 'ORDER_ITEM_CLICK':
      return {
        ...state,
       clickedOrderId : action.payload
      };
    default:
      return state;
  }
};

//=============================================================================
//ActionCreators
//=============================================================================

export const fetchAllOrders = () => {
  return async (dispatch, getState) => {
    
    if (getState().orders.alreadyFetched) {
        return ;
    }

    dispatch({
        type: 'SET_ALREADY_FETCHED'
    });

    
    
    const url = format(URL_GET_ALL_ORDERS, getState().orders.rows.length);
    const axRes = await axios.get(url);

    dispatch({
      type: 'FETCH_ORDERS_DONE',
      payload: axRes.data.data
    });
  };
};

export const setSearchText = text => {
  return async (dispatch, getState) => 
  {
      //search
      const url = format(URL_SEARCH_ORDER, text);
      const axRes = await axios.get(url);
      dispatch
      ({
        type: 'ORDER_SET_SEARCH_TEXT',
        payload: axRes.data.data
      });
  };
};

export const setOrderId = orderId => ({
  type: 'ORDER_SET_BY_ID',
  payload: orderId
});

export const clickOrderId = order_id => ({
  type: 'ORDER_ITEM_CLICK',
  payload: order_id
});
