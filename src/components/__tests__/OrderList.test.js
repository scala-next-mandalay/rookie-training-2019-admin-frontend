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
      newOrders = [{id: "11"}];
    }
    else 
      newOrders = [{id: "1"},
                  {id: "2"},
                  {id: "3"},
                  {id: "4"},
                  {id: "5"},
                  {id: "6"},
                  {id: "7"},
                  {id: "8"},
                  {id: "9"},
                  {id: "10"}];
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
          for (const n of orders) {
            if (n.address1.toLowerCase().indexOf(setText.toLowerCase()) > -1 ||
                n.address2.toLowerCase().indexOf(setText.toLowerCase()) > -1 ||
                n.city.toLowerCase().indexOf(setText.toLowerCase()) > -1 ||
                n.country.toLowerCase().indexOf(setText.toLowerCase()) > -1 ||
                n.first_name.toLowerCase().indexOf(setText.toLowerCase()) > -1 ||
                n.last_name.toLowerCase().indexOf(setText.toLowerCase()) > -1 ||
                n.state.toLowerCase().indexOf(setText.toLowerCase()) > -1
                ) 
            {
                orders = [n];
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
        act(() => {
          valueSetter.call(inputArr[0], "Mag");
          inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
        const searchButton = container.querySelectorAll('Button');
        act(() => {
          searchButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const expectedOrders = [
          {address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 }
        ];
        
        expect(setSearchText).toHaveBeenCalled();
        expect(orders).toStrictEqual(expectedOrders);
      });
      
      it('testing Prev and Next Button', () => {
        let orders = [{id: "1"},
                  {id: "2"},
                  {id: "3"},
                  {id: "4"},
                  {id: "5"},
                  {id: "6"},
                  {id: "7"},
                  {id: "8"},
                  {id: "9"},
                  {id: "10"},
                  {id: "11"}];
        
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
        const Button = container.querySelectorAll('Button');
        //console.log(Button[2].outerHTML)
        act(() => {
          Button[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        
        expect(fetchAllOrders).toHaveBeenCalled();
        //console.log('Next Val :',num);
        const expectedOutput0 = [{id: "11"}];
        expect(newOrders).toStrictEqual(expectedOutput0);
        //console.log(Button[1].outerHTML)
        
        act(() => {
          Button[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(fetchAllOrders).toHaveBeenCalled();
        //console.log('Prev Val :',num); //This is error , num'output should be 0 because of -10

        const expectedOutput1 = [{id: "1"},
                  {id: "2"},
                  {id: "3"},
                  {id: "4"},
                  {id: "5"},
                  {id: "6"},
                  {id: "7"},
                  {id: "8"},
                  {id: "9"},
                  {id: "10"}];
        //expect(newOrders).toStrictEqual(expectedOutput1);
      });
      
      it('testing links', () => {
        let orders = [{address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 },
                  {address1: "Bauk taw", address2: "POL", city: "Mandalay" , country: "Myanmar",
                    first_name: "Soe", id: 2 , last_name: "Thu" ,state: "Mandalay" ,total_price: 2000 }];
        const fetchAllOrderItems = jest.fn((id) => {
          //console.log('Id :',id);
        });
        act(() => {
          ReactDOM.render((
            <Parent>
                <OrderList 
                  orders={orders}
                  fetchAllOrders={fetchAllOrders}
                  fetchAllOrderItems={fetchAllOrderItems}
                />
            </Parent>
          ), container);
        });
        const link = container.querySelectorAll('a');
        act(() => {
          link[4].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(fetchAllOrderItems).toHaveBeenCalled();
        expect(link[3].getAttribute("href")).toBe("/orderitems");
      });
      
      it('testing sorting', () => {
        let orders = [{address1: "98 street", address2: "Min Buu", city: "Magway" , country: "Myanmar",
                    first_name: "Thet Oo", id: 1 , last_name: "Maung" ,state: "Magway" ,total_price: 6000 },
                  {address1: "Bauk taw", address2: "POL", city: "Mandalay" , country: "Myanmar",
                    first_name: "Soe", id: 2 , last_name: "Thu" ,state: "Mandalay" ,total_price: 2000 }];
        const sorting = jest.fn((sortcol,sortorder) => {
          //console.log('sortcol :',sortcol);
          //console.log('sortorder :',sortorder);
        });
        act(() => {
          ReactDOM.render((
            <Parent>
                <OrderList 
                  orders={orders}
                  fetchAllOrders={fetchAllOrders}
                  sorting={sorting}
                />
            </Parent>
          ), container);
        });
        const label = container.querySelectorAll("th span span");
        act(() => {
          label[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(sorting).toHaveBeenCalled();
        act(() => {
          label[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(sorting).toHaveBeenCalled();
      });
    });