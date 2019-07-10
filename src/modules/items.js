import axios from 'axios'
import { URL_GET_ALL_ITEMS, URL_DELETE_ITEM, URL_PUT_ITEM } from '../constants'
import format from 'string-format'

const initialState = {
  alreadyFetched: false,
  rows: [],
  selectedCateogryId: null,
  noMoreFetch: false,
}

//=============================================================================
//　Reducer
//=============================================================================
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'ITEM_FETCH_ROWS_DONE':
      console.log('ITEM_FETCH_ROWS_DONE', action.payload)
      return {
        ...state,
        rows: [...state.rows, ...action.payload]
      }
    case 'ITEM_DELETE_DONE':
      return _item_delete_done(state, action)
    case 'ITEM_PUT_DONE':
      return _item_put_done(state, action)
    case 'ITEM_SET_CATEGORY_ID':
      return {
        ...state,
        selectedCateogryId: action.payload
      }
    case 'ITEM_NO_MORE_FETCH':
      return {
        ...state,
        noMoreFetch: true
      }
    default:
      return state
  }
}

const _item_put_done = (state, action) => {
  const newRows =  []
  for (const row of state.rows) {
    if (row.id === action.payload.id) {
      //updated row
      newRows.push(action.payload)
    }
    else {
      newRows.push(row)
    }
  }
  
  return {
    ...state,
    rows: newRows
  }
}
const _item_delete_done = (state, action) => {
  const newRows =  []
  for (const row of state.rows) {
    if (row.id !== action.payload) {
      //deleted row
      newRows.push(row)
    }
  }
  
  return {
    ...state,
    rows: newRows
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================

export const saveItem = (item) => {
  return async (dispatch, getState) => {
      //update
      const url = format(URL_PUT_ITEM, item.id)
      const updateData = {
        name: item.name, 
        price: item.price, 
        category_id: item.category_id
      }
      const axRes = await axios.put(url, updateData)
      console.log('PUT_URL is ', url)
      console.log('axRes.data.data is :', axRes.data.data)
      dispatch({
        type: 'ITEM_PUT_DONE',
        payload: axRes.data.data
      })
  }
}

export const deleteItem = (item) => {
  return async (dispatch, getState) => {
    
      //delete
      const url = format(URL_DELETE_ITEM, item.id)
      await axios.delete(url)
      dispatch({
        type: 'ITEM_DELETE_DONE',
        payload: item.id
      })
    
  }
}

export const fetchAllItems = () => {
  return async (dispatch, getState) => {
    
    
    /*if (getState().items.alreadyFetched) {
      return
    }
    
    dispatch({
      type: 'ITEM_SET_ALREADY_FETCHED'
    })*/
    
    const url = format(URL_GET_ALL_ITEMS, getState().items.rows.length)
    console.log('fetchAllItems', url)
    const axRes = await axios.get(url)
    
    if (axRes.data.data.length === 0) {
      dispatch({
        type: 'ITEM_NO_MORE_FETCH'
      })
    }

    dispatch({
      type: 'ITEM_FETCH_ROWS_DONE',
      payload: axRes.data.data
    })
  }
}

export const setCategoryId = categoryId => ({
  type: 'ITEM_SET_CATEGORY_ID',
  payload: categoryId
})