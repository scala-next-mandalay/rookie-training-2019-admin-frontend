/*global expect*/
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import MenuList from '../MenuList';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});

describe("MenuList component", () => {
    
  it('matches the snapshot', () => {
    const MenuListSnapshot = renderer.create(
      <Parent><MenuList /></Parent>
    ).toJSON();
    expect(MenuListSnapshot).toMatchSnapshot();
  });
});

describe("testing menu list", () => {
    
  it('testing menulist link', () => {
    act(() => {
      ReactDOM.render((
        <Parent><MenuList /></Parent>
      ), container);
    });
    const linkArr = document.querySelectorAll('a');
    expect(linkArr[0].textContent.toUpperCase()).toBe("ARTISTS");
    expect(linkArr[0].getAttribute("href")).toBe("/categories");
    expect(linkArr[1].textContent.toUpperCase()).toBe("ARTWORKS");
    expect(linkArr[1].getAttribute("href")).toBe("/items");
    expect(linkArr[2].textContent.toUpperCase()).toBe("ORDERS");
    expect(linkArr[2].getAttribute("href")).toBe("/orders");
  });
 
})