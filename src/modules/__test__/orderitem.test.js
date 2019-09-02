/*global jest*/
/*global expect*/
import { orderitemsReducer, fetchAllOrderItems } from '../orderitems';
import mockAxios from "axios";

//=============================================================================
//Reducer testing
//=============================================================================

describe("orderitem reducer actions", () => {
  const initialState = {
    rows: [],
    loading: false
  };
  
  it("orderitem fetch rows done", () => {
    const action = {
      type: 'FETCH_ORDERITEMS_DONE',
      payload: [{ id: 1, order_id: 1, item_id: 20 }]
    };
    const expectedState = {
      ...initialState,
      rows: [...initialState.rows, ...[{ id: 1, order_id: 1, item_id: 20 }]]
    };
    const inputState = orderitemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  
  it("default", () => {
    const action = {
      type: "Default"
    };
    
    const expectedState = {
      ...initialState
    };
    
    const inputState = orderitemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});

//=============================================================================
//ActionCreators
//=============================================================================

describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      orderitems: { rows:{ id: 1, order_id: 1, item_id: 20 } },
      auth: {
        user: {
          signInUserSession: {
            accessToken: { jwtToken: "123456789" }
          }
        }
      }
    };
  };
  
  it("fetch all orderitems with data", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{ id: 1, order_id: 1, item_id: 20 }] }
      })
    );
    
    const expectedAction1 =[{
      type: 'ORDERITEMS_FETCH_BEGIN'
    }];
    
    const expectedAction2 = [{
      type: 'FETCH_ORDERITEMS_DONE',
      payload: [{ id: 1, order_id: 1, item_id: 20 }]
    }];

    const dispatch = jest.fn();
    const orderId = 3;
    await fetchAllOrderItems(orderId)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019adminbackend-env.mdknpzkmj7.ap-northeast-1.elasticbeanstalk.com/api/orderitems?order_id=3",
    {"headers": {"Authorization": "Bearer 123456789"}});
  });
});