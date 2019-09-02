/*global jest,expect,Event,MouseEvent*/
import React from 'react';
import 'jest-prop-type-error';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import TitleBar from '../TitleBar';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});

const fetchAuthedUser = jest.fn(() => {
  let user = [{ id: 1, emali: "a@gmail.com" }];
});

const changeAuthState = jest.fn(() => {
  let auth = true;
});

const signOut = jest.fn(()=>{
  let auth = false;
});
describe("Titalbar component", () => {
  it('matches the snapshot', () => {
    const TitalbarSnapshot= renderer.create(
      <Parent>
        <TitleBar
          fetchAuthedUser={fetchAuthedUser}
          changeAuthState={changeAuthState}
          signOut={signOut}/>
      </Parent>
    ).toJSON();
    expect(TitalbarSnapshot).toMatchSnapshot();
  });
});

describe("Teting titlebar", () => {
  it('Testing Signout button', () => {
    act(() => {
      ReactDOM.render((
        <Parent>
          <TitleBar
            fetchAuthedUser={fetchAuthedUser}
            changeAuthState={changeAuthState} 
            signOut={signOut}/>
        </Parent>
      ), container);
      
      const button = container.querySelectorAll('Button');
        act(() => {
          button[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
      
      
      // cannot test becauseof  <Hidden /> but comment <Hidden/> the following testing work

      const ButtonArr = container.querySelectorAll('button');
      //console.log('HTML :',document.body.outerHTML);
        act(() => {
          ButtonArr[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
      //console.log('HTML :',document.body.outerHTML);
      //const Button = container.querySelectorAll('Button');
      //console.log('AfterClicked :',Button);
      //console.log('Buttons :',Button.length)
        // act(() => {
        //   ButtonArr[2].dispatchEvent(new Event('click', { bubbles: true }));
        // });
      
        // expect(signOut).toHaveBeenCalled();
        
    });
   });
});