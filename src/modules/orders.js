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
  console.log('#REDUCER#'+action.type, action);
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

    //const axRes = await axios.get(URL_GET_ALL_CUSTOMERS)
    // const axRes = {
    //   data: {
    //     data: [
    //         {id:1,created_at:'1019/07/21 4:44:59',first_name:"Mg",last_name:"Oo",address1:'Mandalay',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein", total_price:61.2},
    //         {id:2,created_at:'2019/07/21 4:44:59',first_name:"Jun",last_name:"Jun",address1:'Pyi',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:87.5},
    //         {id:3,created_at:'2019/07/21 4:44:59',first_name:"San",last_name:"Tha",address1:'Sagaing',address2:'Mandalay',country:"Myanmar",state:"Pyi",city:"sagaing", total_price:60.8},
    //         {id:4,created_at:'2019/07/21 4:44:59',first_name:"Wai",last_name:"Phyo",address1:'Kyoukse',address2:'Mandalay',country:"Myanmar",state:"Naypyitaw",city:"pathein",total_price:241.8},
    //         {id:5,created_at:'2019/07/21 4:44:59',first_name:"Than",last_name:"Htike",address1:'Pathein',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein", total_price:184.0},
    //         {id:6,created_at:'2019/07/21 4:44:59',first_name:"Ei",last_name:"Ei",address1:'Inlay',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:10.4},
    //         {id:7,created_at:'2019/07/21 4:44:59',first_name:"Soe",last_name:"Thu",address1:'Bagan',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:16.4},
    //         {id:8,created_at:'2019/07/21 4:44:59',first_name:"Yan",last_name:"Naing",address1:'ChaungTha',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:20.9},
    //         {id:9,created_at:'2019/07/21 4:44:59',first_name:"Shin",last_name:"Shin",address1:'Sagaing',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:54.4},
    //         {id:10,created_at:'2019/07/21 4:44:59',first_name:"Thaw",last_name:"Di",address1:'Madaya',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:33.6},
    //         {id:11,created_at:'2019/07/21 4:44:59',first_name:"Myo",last_name:"Aung",address1:'Moneywa',address2:'Yangon',country:"Myanmar",state:"Pyi",city:"pathein",total_price:82.4},
    //     ]
    //   }
    // };
    
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
