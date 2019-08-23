/*global jest*/
/*global expect*/
import { ordersReducer, fetchAllOrders, setSearchText,sorting } from '../orders';
import mockAxios from "axios";
//import { async } from 'q';
//Reducer testing
describe("order reducer actions", () => {
  const initialState = {
    rows: [],
  };
  
  const state = {
    rows: [{ id: 1, created_at: "toko"}],
  };
  
  it("order fetch rows done", () => {
    const action = {
      type: 'FETCH_ORDERS_DONE',
      payload: [{ id: 10, created_at: "22/7/2019"}]
    };
    const expectedState = {
      ...initialState,
      rows: [...initialState.rows, ...[{ id: 10, created_at: "22/7/2019"}]]
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("order set search text", () => {
    const action = {
      type: 'ORDER_SET_SEARCH_TEXT',
      payload: 'toko'
    };
    const expectedState = {
      ...state,
      rows: 'toko'
    };
    const inputState = ordersReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("order sorting", () => {
    const action = {
      type: 'SORTING_ORDER_COLUMNS',
      payload: [{sortcol:'created_at',sortorder:'desc'}]
    };
    const expectedState = {
      ...state,
      rows: [{sortcol:'created_at',sortorder:'desc'}]
    };
    const inputState = ordersReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("default", () => {
    const action = {
      type: "Default"
    };
    
    const expectedState = {
      ...initialState
    };
    
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});

//=============================================================================
//ActionCreators
//=============================================================================

describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      orders: { rows:{ id: 10, created_at: "22/7/2019"} },
      auth: {
        user: {
          signInUserSession: {
            accessToken: { jwtToken: "123456789" }
          }
        }
      }
    };
  };
  
  it("order fetched", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: {id: 10, created_at: "22/7/2019"}}
      })
    );

    const expectedAction = [{
      type: 'FETCH_ORDERS_DONE',
      payload: {id: 10, created_at: "22/7/2019"}
    }];
    
    const dispatch = jest.fn();
    const start = 13;
    await fetchAllOrders(start)(dispatch, getState);
    
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019adminbackend-env.mdknpzkmj7.ap-northeast-1.elasticbeanstalk.com/api/orders?start=13&sortcol=created_at&sortorder=desc",
    {"headers": {"Authorization": "Bearer 123456789"}});
  });
  
  it("order set search text", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{id: 10, first_name: "toko"}] }
      })
    );
    
    const expectedAction = [{
      type: 'ORDER_SET_SEARCH_TEXT',
      payload: [{id: 10, first_name: "toko"}]
    }];
    const dispatch = jest.fn();
    const text = "toko";
    await setSearchText(text)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019adminbackend-env.mdknpzkmj7.ap-northeast-1.elasticbeanstalk.com/api/orders?search=toko",
    {"headers": {"Authorization": "Bearer 123456789"}});
  });
  
  it("order sorting", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{sortcol:'created_at',sortorder:'desc'}] }
      })
    );
    
    const expectedAction = [{
      type: 'SORTING_ORDER_COLUMNS',
      payload: [{sortcol:'created_at',sortorder:'desc'}]
    }];
    const dispatch = jest.fn();
    const col = 'created_at';
    const order = 'desc';
    await sorting(col,order)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019adminbackend-env.mdknpzkmj7.ap-northeast-1.elasticbeanstalk.com/api/orders?sortcol=created_at&sortorder=desc",
    {"headers": {"Authorization": "Bearer 123456789"}});
  });
  
});