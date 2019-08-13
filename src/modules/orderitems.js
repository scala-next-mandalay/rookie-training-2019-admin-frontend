import axios from 'axios';
import { URL_REST_ORDERITEMS } from '../constants';

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
    if (!getState().auth.user) {
        return;
      }
  
    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;

    const auth = {
        headers: {Authorization:'Bearer ' + token } 
    };
    //for (const orderRow of  getState().orders.rows) {
     // if (orderRow.id === orderId) {
        //search
        let url = URL_REST_ORDERITEMS+'?order_id='+orderId;
        const axRes = await axios.get(url,auth);
    
        dispatch({
          type: 'FETCH_ORDERITEMS_DONE',
          payload:  axRes.data.data
        });
        //break;
      //}
    //}
  };
};