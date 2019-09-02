/*global jest,expect,MouseEvent,Event*/
import React from 'react';
import ReactDOM from 'react-dom';
import OrderItemList from '../OrderItemList';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});

    describe("OrderItemList component", () => {
      let orderitems = [{id: 301, order_id: 199, total_price : 2000, item_id: 37, name:'Gogh07',  quantity:2, unit_price: 1000 }];
      
      it('matches the snapshot', () => {
        const OrderItemListSnapshot = renderer.create(
          <Parent>
            <OrderItemList
              orderitems={orderitems}
            />
          </Parent>
        ).toJSON();
        expect(OrderItemListSnapshot).toMatchSnapshot();
      });
      
    });