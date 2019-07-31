import axios from 'axios';
import { URL_GET_ALL_ORDERS,URL_SEARCH_ORDER } from '../constants';
import format from 'string-format';

const initialState = {
  alreadyFetched: false,
  searchText: '',
  rows: [],
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
    case 'ORDER_SET_SEARCH_TEXT':
      console.log("search",action.payload)
      return {
        ...state,
        searchText: action.payload[0],
        rows: action.payload[1]
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
      console.log("search url:",url)
      const axRes = await axios.get(url);
      dispatch({
        type: 'ORDER_SET_SEARCH_TEXT',
        payload: [text,axRes.data.data]
      });
  };
};
