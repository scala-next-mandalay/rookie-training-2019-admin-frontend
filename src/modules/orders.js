import axios from 'axios';
import { URL_REST_ORDERS } from '../constants';

const initialState = {
  rows: [],
};

//=============================================================================
//Reducer
//=============================================================================
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_DONE':
      return {
        ...state,
        rows: action.payload
      };
    case 'ORDER_SET_SEARCH_TEXT':
      return {
        ...state,
        rows: action.payload
      };
    case 'SORTING_ORDER_COLUMNS':
      return {
        ...state,
        rows : action.payload
      };
    default:
      return state;
  }
};

//=============================================================================
//ActionCreators
//=============================================================================

export const fetchAllOrders = (num) => {
  return async (dispatch, getState) => {
    if (!getState().auth.user) {
      return;
    }

    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;
    //console.log('Token:',token);
    const auth = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = URL_REST_ORDERS+'?start='+num+'&sortcol=created_at&sortorder=desc';
    const axRes = await axios.get(url,auth);

    dispatch({
      type: 'FETCH_ORDERS_DONE',
      payload: axRes.data.data
    });
  };
};

export const setSearchText = text => {
  return async (dispatch, getState) => 
  {   
    if (!getState().auth.user) {
      return;
    }

    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;
    const auth = {
      headers: { Authorization: 'Bearer ' + token }
    };
      //search
      let url = URL_REST_ORDERS+'?search='+text;
      const axRes = await axios.get(url,auth);
      dispatch({
        type: 'ORDER_SET_SEARCH_TEXT',
        payload: axRes.data.data
      });
  };
};

export const sorting = ( sortcol,sortorder ) => {
  return async (dispatch, getState) => 
  {   
    if (!getState().auth.user) {
      return;
    }
    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;
    const auth = {
      headers: { Authorization: 'Bearer ' + token }
    };
      //sort
      let url = URL_REST_ORDERS+'?sortcol='+sortcol+'&sortorder='+sortorder;
      const axRes = await axios.get(url,auth);
      dispatch({
        type: 'SORTING_ORDER_COLUMNS',
        payload: axRes.data.data
      });
  };
};