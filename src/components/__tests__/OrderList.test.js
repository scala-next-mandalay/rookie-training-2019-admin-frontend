/*global jest,expect,MouseEvent,Event*/
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import OrderList from '../OrderList';
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

let num = 0 ;let newOrders = [];
const fetchAllOrders = jest.fn((val) => {
    num = val;
    //console.log('Income Value :',num)
    if(num >= 10)
    {
      newOrders = [{address1: "11"}];
    }
    else 
      newOrders = [{address1: "1"},
                  {address1: "2"},
                  {address1: "3"},
                  {address1: "4"},
                  {address1: "5"},
                  {address1: "6"},
                  {address1: "7"},
                  {address1: "8"},
                  {address1: "9"},
                  {address1: "10"},
                  {address1: "11"}];
});
    
const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

    describe("OrderList component", () => {
      let orders = [{address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 },
                  {address1: "Bauk taw", address2: "POL", city: "Mandalay" , country: "Myanmar",
                    first_name: "Soe", id: 2 , last_name: "Thu" ,state: "Mandalay" ,total_price: 2000 }];
      
      it('matches the snapshot', () => {
        const OrderListSnapshot = renderer.create(
          <Parent>
            <OrderList
              orders={orders}
              fetchAllOrders={fetchAllOrders}
            />
          </Parent>
        ).toJSON();
        expect(OrderListSnapshot).toMatchSnapshot();
      });
      
    });
    
    describe("Order Searching", () => {
      it('should have 1 textfield , 3 buttons and 5 links', () => {
        let orders = [{address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 },
                  {address1: "Bauk taw", address2: "POL", city: "Mandalay" , country: "Myanmar",
                    first_name: "Soe", id: 2 , last_name: "Thu" ,state: "Mandalay" ,total_price: 2000 }];
        
        act(() => {
          ReactDOM.render((
            <Parent>
                <OrderList 
                  orders={orders}
                  fetchAllOrders={fetchAllOrders}
                />
            </Parent>
          ), container);
        });
        
        const inputArr = document.querySelectorAll('input');
        expect(inputArr).toHaveLength(1);
        expect(inputArr[0].id).toBe("standard-search");
        const button = container.querySelectorAll('Button');
        expect(button[1].textContent.toUpperCase()).toBe("PREV");
        expect(button[2].textContent.toUpperCase()).toBe("NEXT");
        const link = document.querySelectorAll('a');
        expect(link).toHaveLength(5);
      });
      
      it('check working searching', () => {
        let orders = [{address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 },
                  {address1: "Bauk taw", address2: "POL", city: "Mandalay" , country: "Myanmar",
                    first_name: "Soe", id: 2 , last_name: "Thu" ,state: "Mandalay" ,total_price: 2000 }];

        const setSearchText = jest.fn((setText) => {
          console.log('SearchText :',setText)
          for (const n of orders) {
            if (n.address1.toLowerCase().indexOf(setText.toLowerCase())) 
            {
                console.log('Hoo :',setText)
            }
          }
          return orders;
        });
        
        act(() => {
          ReactDOM.render((
            <Parent>
                <OrderList 
                  orders={orders}
                  fetchAllOrders={fetchAllOrders}
                  setSearchText={setSearchText}
                />
            </Parent>
          ), container);
        });
        
        const inputArr = document.querySelectorAll('input');
        console.log('Before :',inputArr[0].value);
        inputArr[0].value = "Min";
        act(() => {
          inputArr[0].dispatchEvent(new MouseEvent('change', { bubbles: true }));
        });
        console.log('After :',inputArr[0].value)
        expect(inputArr[0].value).toBe("Min");
        const searchButton = container.querySelectorAll('Button');
        act(() => {
          searchButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const expectedOrders = [
          {address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 }
        ];
        
        expect(setSearchText).toHaveBeenCalledWith();
        expect(orders).toStrictEqual(expectedOrders);
      });
      
      // it('testing Prev and Next Button', () => {
      //   let orders = [{address1: "1"},
      //             {address1: "2"},
      //             {address1: "3"},
      //             {address1: "4"},
      //             {address1: "5"},
      //             {address1: "6"},
      //             {address1: "7"},
      //             {address1: "8"},
      //             {address1: "9"},
      //             {address1: "10"},
      //             {address1: "11"}];
        
      //   act(() => {
      //     ReactDOM.render((
      //       <Parent>
      //           <OrderList 
      //             orders={orders}
      //             fetchAllOrders={fetchAllOrders}
      //           />
      //       </Parent>
      //     ), container);
      //   });
      //   const Button = container.querySelectorAll('Button');
      //   act(() => {
      //     Button[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      //   });
      //   expect(fetchAllOrders).toHaveBeenCalled();
      //   console.log('NextOrders :',newOrders)
      //   console.log('Next Val :',num)
      //   console.log('Prev ? :',Button[1].textContent)
      //   act(() => {
      //     Button[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      //   });
      //   expect(fetchAllOrders).toHaveBeenCalled();
      //   expect(fetchAllOrders).toHaveBeenCalled();
      //   console.log('PrevOrders :',newOrders)
      //   console.log('Prev Val :',num)
      // });
    });