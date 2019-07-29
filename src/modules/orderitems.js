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
  
    //search
      const url = format(URL_GET_ORDERITEMS, id);
      const axRes = await axios.get(url);

    dispatch({
      type: 'FETCH_ORDERITEMS_DONE',
      payload: axRes.data.data
    });
  };
};