import axios from 'axios';
import { URL_REST_ITEMS, URL_PUT_ITEM,URL_POST_ITEM } from '../constants';
import format from 'string-format';
import { Storage } from 'aws-amplify';

const initialState = {
  alreadyFetched: false,
  rows: [],
  selectedCateogryId: null,
  noMoreFetch: false,
  openDialog: false,
};

//=============================================================================
//Reducer
//=============================================================================
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      };
    case 'ITEM_FETCH_ROWS_DONE':
      return {
        ..._getCommonState(state),
        rows: [...state.rows, ...action.payload]
      };
    
    case 'ITEM_POST_DONE':
      return {
        ..._getCommonState(state),
        rows: [...state.rows, action.payload],
      };
    case 'ITEM_PUT_DONE':
      return _item_put_done(state, action);
      
    case 'ITEM_DELETE_DONE':
      return _item_delete_done(state, action);
      
    case 'ITEM_SET_CATEGORY_ID':
      return {
        ...state,
        selectedCateogryId: action.payload
      };
    case 'ITEM_NO_MORE_FETCH':
      return {
        ...state,
        noMoreFetch: true
      };
    case 'ITEM_BEGIN_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'ITEM_OPEN_DIALOG':
      return {
        ...state,
        openDialog: action.payload
      };
    default:
      return state;
  }
};

const _item_put_done = (state, action) => {
  const newRows =  [];
  for (const row of state.rows) {
    if (row.id === action.payload.id) {
      //updated row
      newRows.push(action.payload);
    }
    else {
      newRows.push(row);
    }
  }
  
  return {
    ..._getCommonState(state),
    rows: newRows,
  };
};
const _item_delete_done = (state, action) => {
  const newRows =  [];
  for (const row of state.rows) {
    if (row.id !== action.payload) {
      //deleted row
      newRows.push(row);
    }
  }
  
  return {
    ..._getCommonState(state),
    rows: newRows,
  };
};

const _getCommonState = (state) => ({
  ...state,
  loading: false,
  openDialog: false,
});

//=============================================================================
//ActionCreators
//=============================================================================

export const saveItem = (item,fileName, fileData) => {
  return async (dispatch, getState) => {
      dispatch({
        type: 'ITEM_BEGIN_LOADING'
      });
      if (!getState().auth.user) {
        return;
      }
      //update
      const updateData = {
        name: item.name, 
        price: item.price, 
        category_id: Number(item.category_id),
        image: item.image,
      };
      if(fileName !== null && fileData !== null){
      await Storage.put(fileName, fileData, {
          contentType: fileData.type
      });
    }
      
    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;
    const auth = {
        headers: {Authorization:'Bearer ' + token } 
    };
    if (item.id === null || item.id === undefined) {
      
      //INSERT
      const axRes = await axios.post(URL_POST_ITEM, updateData,auth);
      dispatch({
        type: 'ITEM_POST_DONE',
        payload: axRes.data.data
      });
    }
    else {
      //UPDATE
      const url = format(URL_PUT_ITEM, item.id);
      const axRes = await axios.put(url, updateData,auth);
      dispatch({
        type: 'ITEM_PUT_DONE',
        payload: axRes.data.data
      });
    }
  };
};

export const deleteItem = (item) => {
  return async (dispatch, getState) => {
      
      dispatch({
        type: 'ITEM_BEGIN_LOADING'
      });
      
      if (!getState().auth.user) {
        return;
      }
  
      const token = getState().auth.user.signInUserSession.accessToken.jwtToken;

      const auth = {
          headers: {Authorization:'Bearer ' + token } 
      };
      
      //delete
      const url = URL_REST_ITEMS + '/' + item.id;
      await axios.delete(url, auth);
      dispatch({
        type: 'ITEM_DELETE_DONE',
        payload: item.id
      });
  };
};

export const fetchAllItems = () => {
  return async (dispatch, getState) => {
    if (!getState().auth.user) {
      return;
    }
    if (getState().items.loading) {
      return;
    }
    
    dispatch({
      type: 'ITEM_BEGIN_LOADING'
    });
    
    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;
    const auth = {
        headers: {Authorization:'Bearer ' + token } 
    };
    
    
    let url = URL_REST_ITEMS+'?offset='+getState().items.rows.length;
    //if (getState().items.selectedCateogryId) {
    //  url += '&category_id='+getState().items.selectedCateogryId;
    //}
    const axRes = await axios.get(url,auth);
    if (axRes.data.data.length === 0) {
      dispatch({
        type: 'ITEM_NO_MORE_FETCH'
      });
    }
  
    dispatch({
      type: 'ITEM_FETCH_ROWS_DONE',
      payload: axRes.data.data
    });
  };
};

export const setCategoryId = categoryId => ({
  type: 'ITEM_SET_CATEGORY_ID',
  payload: categoryId
});

export const setOpenDialog = (val) => ({
  type: 'ITEM_OPEN_DIALOG',
  payload: val
})