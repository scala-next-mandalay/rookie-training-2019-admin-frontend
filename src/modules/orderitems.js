import axios from 'axios';
import { URL_GET_ORDERITEMS } from '../constants';
import format from 'string-format';

const initialState = {
  alreadyFetched: false,
  rows: [],
};

//=============================================================================
//Reducer
//=============================================================================
export const orderitemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      };
    case 'FETCH_ORDERITEMS_DONE':
      return {
        ...state,
        rows: action.payload
      };
    default:
      return state;
  }
};

//=============================================================================
//ActionCreators
//=============================================================================
export const fetchAllOrderItems = (id) => {
  return async (dispatch, getState) => {
    //const axRes = await axios.get(URL_GET_ALL_CUSTOMERS)
    // const axRes = {
    //   data: {
    //     data: [
    //       {id: 1, order_id: 6,item_id: 14,unit_price:34.4,quantity:4},
    //       {id: 2, order_id: 6,item_id: 15,unit_price:45.4,quantity:6},
    //       {id: 3, order_id: 6,item_id: 20,unit_price:25.4,quantity:3},
    //       {id: 4, order_id: 6,item_id: 21,unit_price:75.4,quantity:5},
    //       {id: 5, order_id: 6,item_id: 23,unit_price:21.4,quantity:9},
    //       {id: 6, order_id: 6,item_id: 24,unit_price:43.4,quantity:1},
    //       {id: 7, order_id: 6,item_id: 25,unit_price:91.4,quantity:4},
    //       {id: 8, order_id: 2,item_id: 26,unit_price:25.4,quantity:2},
    //       {id: 9, order_id: 4,item_id: 21,unit_price:65.4,quantity:2},
    //     ]
    //   }
    // };
    
    //search
      const url = format(URL_GET_ORDERITEMS, id);
      const axRes = await axios.get(url);

    dispatch({
      type: 'FETCH_ORDERITEMS_DONE',
      payload: axRes.data.data
    });
  };
};