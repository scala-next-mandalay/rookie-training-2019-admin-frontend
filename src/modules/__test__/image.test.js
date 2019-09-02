/*global expect,jest*/
import { imageReducer, setRequestParams,uploadImage} from '../image';
import { Storage } from 'aws-amplify';

//=============================================================================
//Reducer testing
//=============================================================================

describe("image reducer actions", () => {
  const initialState = {
    requestParams: null,
    error: null,
    loading: false,
  };
  
  it("Image uploading successful", () => {
    const action = {
      type: 'IMAGE_UPLOAD_SUCCESS',
      payload: {name:'blat',data:'sota',type:'image/jpg'}
    };
    const expectedState = {
      ...initialState,
      requestParams: {name:'blat',data:'sota',type:'image/jpg'}
    };
    const inputState = imageReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Image init", () => {
    const action = {
      type: 'IMAGE_INIT'
    };
    const expectedState = {
      ...initialState
    };
    const inputState = imageReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("default", () => {
    const action = {
      type: "Default"
    };
    
    const expectedState = {
      ...initialState
    };
    
    const inputState = imageReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});

//=============================================================================
//ActionCreators
//=============================================================================

describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      auth: { 
        requestParams: null,
        error: null,
        loading: false,
        }
    };
  };
  
  describe('Testing setRequestParams', () => {
      it("Test setRequestParams", async () => {
        const expectedAction = [{
          type: 'IMAGE_INIT'
        }];
        const dispatch = jest.fn();
        await setRequestParams()(dispatch,getState);
        expect(dispatch.mock.calls[0]).toEqual(expectedAction);
      });
  });
  
  describe("Testing uploading image", () => {
    it("Testing uploading image success", async () => {
      let res = {data: {name:'blat',data:'sota',type:'image/jpg'}};
      
      Storage.put = jest.fn().mockImplementation(
      () => {
          return  res;
      });
      const expectedAction_common=[{
          type :'IMAGE_BEGIN_LOADING'
        }];
        
      const expectedAction1=[{
          type :'IMAGE_UPLOAD_SUCCESS',
          payload: res
        }];
      const dispatch = jest.fn();
      await uploadImage('blat','sota','image/jpg')(dispatch, getState);
      expect(Storage.put).toHaveBeenCalledWith('blat','sota',{contentType:'image/jpg'});
      expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
      expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
    });
    
    it("Testing uploading image throw error", async () => {
      Storage.put = jest.fn().mockImplementation(
      () => {
          throw "uploading failed!";
      });
      const expectedAction_common=[{
          type :'IMAGE_BEGIN_LOADING'
        }];
        
      const expectedAction1=[{
          type :'IMAGE_INIT'
        }];
      const dispatch = jest.fn();
      await uploadImage('blat','sota','image/jpg')(dispatch, getState);
      expect(Storage.put).toHaveBeenCalledWith('blat','sota',{contentType:'image/jpg'});
      expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
      expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
    });
  });
});