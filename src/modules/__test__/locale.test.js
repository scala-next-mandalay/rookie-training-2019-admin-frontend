/*global expect*/
import { localeReducer, setLocale } from '../locale';
//import mockAxios from "axios";

//Reducer testing
describe("locale reducer actions", () => {
  const initialState = {
    locale: 'en',
  };
  
  it("default", () => {
    const action = {
      type: "Default"
    };
    
    const expectedState = {
      ...initialState
    };
    
    const inputState = localeReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
});

//=============================================================================
//ActionCreators
//=============================================================================

describe("ActionCreators Testing", () => {
  
  it("set locale ", async () => {
    const expectedAction = {
      type: 'LOCALE_SET_LANG',
      payload: "ja"
    };
    const lang = "ja";
    const action = setLocale(lang);
    expect(action).toEqual(expectedAction);
  });
});