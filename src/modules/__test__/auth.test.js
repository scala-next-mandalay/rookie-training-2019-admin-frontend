/*global expect,jest*/
import { authReducer,changeAuthState,fetchAuthedUser,signOut,signIn,signUp,confirmSignUp,resendSignUp,forgotPassword,forgotPasswordSubmit } from '../auth';
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from '../../aws-exports';
Amplify.configure(config);

//=============================================================================
//Reducer testing
//=============================================================================

describe("auth reducer actions", () => {
  const initialState = {
    authState: 'signIn',
    user: null,
    email: null,
    error: null,
    loading: false,
  };
  
  const state = {
    authState: '',
    user: null,
    email: null,
    error: null,
    loading: false,
  };
  
  it("System authantication error", () => {
    const action = {
      type: 'AUTH_SYSTEM_ERROR',
      payload: "system error"
    };
    const expectedState = {
      ...state,
      error: "system error"
    };
    const inputState = authReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Auth begin loading", () => {
    const action = {
      type: 'AUTH_BEGIN_LOADING'
    };
    const expectedState = {
      ...initialState,
      loading : true
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Auth init", () => {
    const action = {
      type: 'AUTH_INIT'
    };
    const expectedState = {
      ...initialState
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Authantication change state", () => {
    const action = {
      type: 'AUTH_CHANGE_AUTH_STATE',
      payload: "signIn"
    };
    const expectedState = {
      ...state,
      authState: "signIn"
    };
    const inputState = authReducer(state, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Fetch Authanticated user", () => {
    const action = {
      type: 'AUTH_FETCH_AUTHED_USER',
      payload: [{email: 'mglay@gmail.com', password: '12345678'}]
    };
    const expectedState = {
      ...initialState,
      user: [{email: 'mglay@gmail.com', password: '12345678'}]
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Authantication sign in successful", () => {
    const action = {
      type: 'AUTH_SIGN_IN_SUCCESS',
      payload: [{email: 'mglay@gmail.com', password: '12345678'}]
    };
    const expectedState = {
      ...initialState,
      user: [{email: 'mglay@gmail.com', password: '12345678'}],
      authState: null
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Authantication sign up successful", () => {
    const action = {
      type: 'AUTH_SIGN_UP_SUCCESS',
      payload: 'mglay@gmail.com'
    };
    const expectedState = {
      ...initialState,
      email: 'mglay@gmail.com',
      authState: 'confirmSignUp'
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Auth forgot password success", () => {
    const action = {
      type: 'AUTH_FORGOT_PASSWORD_SUCCESS',
      payload: 'mglay@gmail.com'
    };
    const expectedState = {
      ...initialState,
      authState: 'forgotPasswordReset',
      email: 'mglay@gmail.com'
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("default", () => {
    const action = {
      type: "Default"
    };
    
    const expectedState = {
      ...initialState
    };
    
    const inputState = authReducer(initialState, action);
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
        user: {email:'mgmg@gmail.com',password:'12345678'},
        authState: '',
        email: null,
        error: null,
        loading: false,
        }
    };
  };
  
  describe('Testing changing auth state', () => {
      it("change auth state ", async () => {
        const expectedAction = {
          type: 'AUTH_CHANGE_AUTH_STATE',
          payload: 'signIn'
        };
        const value = "signIn";
        const action = changeAuthState(value);
        expect(action).toEqual(expectedAction);
      });
  });
  
  describe('Testing fetching user', () => {
      it("test fetching authenticated user success", async () => {
       let user = {data: { email:'mgmg@gmail.com'}};
        Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
         () => {
            return  user;
        });
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        const expectedData = { data: { email:'mgmg@gmail.com'}};
        
        const expectedAction1 = [{
          type :'AUTH_FETCH_AUTHED_USER',
          payload : expectedData
        }];
    
        const dispatch = jest.fn();
        await fetchAuthedUser()(dispatch, getState);
        expect(Auth.currentAuthenticatedUser).toHaveBeenCalled();
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
      
      it("test fetching authenticated user with error", async () => {
       const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
         () => {
            throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_INIT'
        }];
    
        const dispatch = jest.fn();
        await fetchAuthedUser()(dispatch, getState);
        expect(Auth.currentAuthenticatedUser).toHaveBeenCalledWith();
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  
  describe('Testing sign out action', () => {
      it("test sign out action success", async () => {
        const expectedAction_common=[{
          type :'AUTH_INIT'
        }];
        
        Auth.signOut = jest.fn().mockImplementation(
         () => {
        });
    
        const dispatch = jest.fn();
        await signOut()(dispatch, getState);
        
        expect(Auth.signOut).toHaveBeenCalled();
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
      });
      
      it("test sign out action with error", async () => {
       const expectedAction_common=[{
          type :'AUTH_INIT'
        }];
        Auth.signOut = jest.fn().mockImplementation(
         () => {
            throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await signOut()(dispatch, getState);
        expect(Auth.signOut).toHaveBeenCalledWith();
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  describe('Testing sign in action', () => {
      it("successsful sign In function", async () => {
       let data ={data: { email:'mgmg@gmail.com', password: '12345678' }};
       const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        Auth.signIn = jest.fn().mockImplementation(
         () => {
            return  data;
        });
        
        const expectedData= { data: { email:'mgmg@gmail.com', password: '12345678' }};
        
        const expectedAction1 = [{
          type :'AUTH_SIGN_IN_SUCCESS',
          payload : expectedData
        }];
    
        const dispatch = jest.fn();
        await signIn('mgmg@gmail.com','12345678')(dispatch, getState);
        expect(Auth.signIn).toHaveBeenCalledWith('mgmg@gmail.com','12345678');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
      
      it("sign In function throw error", async () => {
       const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        Auth.signIn = jest.fn().mockImplementation(
         () => {
            throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await signIn('mgmg@gmail.com','12345678')(dispatch, getState);
        expect(Auth.signIn).toHaveBeenCalledWith('mgmg@gmail.com','12345678');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  
  describe('Testing sign up action', () => {
      it("test sign Up action successful", async () => {
       let data ={data: { email:'mgmg@gmail.com', password: '12345678' }};
        Auth.signUp = jest.fn().mockImplementation(
         () => {
            return  data;
        });
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        const expectedData= 'mgmg@gmail.com';
        
        const expectedAction1 = [{
          type :'AUTH_SIGN_UP_SUCCESS',
          payload : expectedData
        }];
    
        const dispatch = jest.fn();
        await signUp('mgmg@gmail.com','12345678')(dispatch, getState);
        expect(Auth.signUp).toHaveBeenCalledWith('mgmg@gmail.com','12345678');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
      
      it("test sign Up action throw error", async () => {
        Auth.signUp = jest.fn().mockImplementation(
         () => {
            throw  "system error";
        });
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await signUp('mgmg@gmail.com','12345678')(dispatch, getState);
        expect(Auth.signUp).toHaveBeenCalledWith('mgmg@gmail.com','12345678');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  
  describe('Testing confirm sign up action', () => {
      it("test Confirm Sign Up action", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.confirmSignUp = jest.fn().mockImplementation(
         () => {
        });
        
        const expectedAction1=[{
          type :'AUTH_INIT'
        }];
    
        const dispatch = jest.fn();
        await confirmSignUp('mgmg@gmail.com','123455')(dispatch, getState);
        expect(Auth.confirmSignUp).toHaveBeenCalledWith('mgmg@gmail.com','123455');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
      
      it("test Confirm Sign Up action throw error", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.confirmSignUp = jest.fn().mockImplementation(
         () => {
           throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await confirmSignUp('mgmg@gmail.com','123455')(dispatch, getState);
        expect(Auth.confirmSignUp).toHaveBeenCalledWith('mgmg@gmail.com','123455');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  
  describe('Testing resend sign up action', () => {
      it("test Resend Sign Up", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.resendSignUp = jest.fn().mockImplementation(
         () => {
        });
        
        const dispatch = jest.fn();
        await resendSignUp('mgmg@gmail.com')(dispatch, getState);
        expect(Auth.resendSignUp).toHaveBeenCalledWith('mgmg@gmail.com');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
      });
      
      it("test resend Sign Up action throw error", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.resendSignUp = jest.fn().mockImplementation(
         () => {
           throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await resendSignUp('mgmg@gmail.com')(dispatch, getState);
        expect(Auth.resendSignUp).toHaveBeenCalledWith('mgmg@gmail.com');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  
  describe('Testing Forgot Password action', () => {
      it("Test Forgot Password action", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.forgotPassword = jest.fn().mockImplementation(
         () => {
        });
        
        const expectedAction1=[{
          type :'AUTH_FORGOT_PASSWORD_SUCCESS',
          payload : 'mgmg@gmail.com'
        }];
        
        const dispatch = jest.fn();
        await forgotPassword('mgmg@gmail.com')(dispatch, getState);
        expect(Auth.forgotPassword).toHaveBeenCalledWith('mgmg@gmail.com');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
      
      it("test forgot password action throw error", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.forgotPassword = jest.fn().mockImplementation(
         () => {
           throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await forgotPassword('mgmg@gmail.com')(dispatch, getState);
        expect(Auth.forgotPassword).toHaveBeenCalledWith('mgmg@gmail.com');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
  
  
  describe('Testing Forgot Password Submit action', () => {
      it("Test Forgot Password Submit", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        Auth.forgotPasswordSubmit = jest.fn().mockImplementation(
         () => {
        });
        const expectedAction1=[{
          type :'AUTH_INIT'
        }];
        
        const dispatch = jest.fn();
        await forgotPasswordSubmit('mgmg@gmail.com','123455','12345678')(dispatch, getState);
        expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith('mgmg@gmail.com','123455','12345678');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
      
      it("Test forgot password submit action throw error", async () => {
        const expectedAction_common=[{
          type :'AUTH_BEGIN_LOADING'
        }];
        
        Auth.forgotPasswordSubmit = jest.fn().mockImplementation(
         () => {
           throw "system error";
        });
        
        const expectedAction1 = [{
          type :'AUTH_SYSTEM_ERROR',
          payload : "system error"
        }];
    
        const dispatch = jest.fn();
        await forgotPasswordSubmit('mgmg@gmail.com','123455','12345678')(dispatch, getState);
        expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith('mgmg@gmail.com','123455','12345678');
        expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
        expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
      });
  });
});