/*global jest,expect,MouseEvent,Event*/
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ItemList from '../ItemList';
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

let openDialog = true;
const setOpenDialog= jest.fn((val) => {
  openDialog = val;
});

let id = null ;
const setCategoryId = jest.fn((val) => {
  id = val;
});

const changeAuthState = jest.fn(() => {
   let auth = true;
});
const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

    describe("ItemList component", () => {
        
      let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
      let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 ,image: 'pic1' },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 ,image: 'pic2' }];
      const saveItem = jest.fn((setSelectedItem,fileName,file) => {
        items = [...items, (setSelectedItem,fileName,file)];
      });
      
      const deleteItem = jest.fn((item_id) => {
        if (item_id === 1) items = [{ id: 2, name: "mer" ,price:3000 , category_id: 2 ,image: 'pic2' }];
        else items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 ,image: 'pic1' }];
      });
      
      it('matches the snapshot', () => {
        const ItemListSnapshot = renderer.create(
          <Parent>
            <ItemList
              items={items}
              categories={categories}
              saveItem={saveItem}
              deleteItem={deleteItem}
              changeAuthState={changeAuthState}
               setCategoryId={setCategoryId}
            />
          </Parent>
        ).toJSON();
        expect(ItemListSnapshot).toMatchSnapshot();
      });
      
    });
  
    describe("testing creating item", () => {
      it('Test selection', () => {
        let categories = [ {id:1 , name : "vermeer"},, {id :3, name: "jogh"}];
        let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 ,image: 'pic1' },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 ,image: 'pic2' }];
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
          
          const selectArr = document.querySelectorAll('select');
          act(() =>{
            selectArr[0].value =  3;
            selectArr[0].dispatchEvent(new MouseEvent('change', {bubbles: true}));
          });
          expect(1).toBe(1);
          expect(setCategoryId).toHaveBeenCalled();
          expect(id).toBe("3");  //string!
        });
      });
      
      it('should exists one create button, three textfields', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 ,image: 'pic1' },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 ,image: 'pic2' }];
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
        });
        
        const button = container.querySelectorAll('Button');
        expect(button[0].textContent.toUpperCase()).toBe("CREATE");
        act(() => {
          button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        const inputArr = document.querySelectorAll('input');
        expect(inputArr).toHaveLength(3);
        expect(inputArr[0].id).toBe("name");
        expect(inputArr[1].id).toBe("price");
        expect(inputArr[2].id).toBe("file");
      });
      
      it('Test selection from dialog box', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 ,image: 'pic1' },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 ,image: 'pic2' }];
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
        });
        
        const button = container.querySelectorAll('Button');
        expect(button[0].textContent.toUpperCase()).toBe("CREATE");
        act(() => {
          button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        const SelectBox = document.querySelectorAll('select');
        //console.log('SelectBox :',SelectBox[1].options);
        expect(SelectBox[1][0].value).toBe("");
      });
      
      it('check three textfield and one select box changing and click cancle button', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 ,image: 'pic1.jpg' },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 ,image: 'pic2.jpg' }];
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
        });
        
        const CreateButton = container.querySelectorAll('Button');
        act(() => {
          CreateButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const inputArr = document.querySelectorAll('input');
        const SelectBox = document.querySelectorAll('select');
        inputArr[0].value = "WaLa";
        inputArr[1].value = 1000;
        SelectBox[1].value = 2;
        
        const CancelButton = document.querySelectorAll('button');
        act(() => {
          CancelButton[5].dispatchEvent(new Event('click', { bubbles: true }));
        });
        
        act(() => {
          CreateButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const inputArr1 = document.querySelectorAll('input');
        const SelectBox1 = document.querySelectorAll('select');
        expect(inputArr1[0].value).toBe("");
        expect(inputArr1[1].value).toBe("");
        expect(SelectBox1[1].value).toBe("");
      });
      
      // it('click submit button', () => {
      //   let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
      //   let items = [{ id: 1 , name: "ver" ,price:"4000", category_id: "1" },
      //             { id: 2,  name: "mer" ,price:"3000", category_id: "2" }];
      //   const saveItem = jest.fn((setSelectedItem) => {
      //     items = [...items, setSelectedItem];
      //   });
      //   act(() => {
      //     ReactDOM.render((
      //       <Parent>
      //         <ItemList items={items} categories={categories} saveItem={saveItem} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
      //       </Parent>
      //     ), container);
      //   });
      //   const CreateButton = container.querySelectorAll('Button');
      //   act(() => {
      //     CreateButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      //   });
        
      //   const inputArr = document.querySelectorAll('input');
      //   const SelectBox = document.querySelectorAll('select');
 
      //   inputArr[0].value= 'Merter05';
      //   inputArr[1].value = 2000;
      //   SelectBox[1].value = 1;
        
      //   act(() => {
      //     inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
      //   });
      //   act(() => {
      //     inputArr[1].dispatchEvent(new Event('change', { bubbles: true }));
      //   });
      //   act(() => {
      //     SelectBox[1].dispatchEvent(new Event('change', { bubbles: true }));
      //   });
        
        
      //   //expect(SelectBox[1].value).toBe("1");
      //   const SubmitButton = document.querySelectorAll('button');
      //   expect(SubmitButton[6].textContent.toUpperCase()).toBe("SUBMIT");
      //   console.log('btn :',SubmitButton[6].textContent)
      //   act(() => {
      //     SubmitButton[6].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      //   });
      //   expect(saveItem).toHaveBeenCalled();
      //   const expectedItems = [
      //     { id: 1 , name: "ver" ,price: "4000", category_id: "1" },
      //     { id: 2,  name: "mer" ,price: "3000", category_id: "2" },
      //     { id: null ,name: 'Merter05' ,price: "2000", category_id: "1" }
      //   ];
        
      //   console.log('Items :',items);
      //   expect(items).toStrictEqual(expectedItems);
      // });
      
      it('should not be called if textfields and option box is empty', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1 , name: "ver" ,price:4000, category_id: 1 },
                  { id: 2,  name: "mer" ,price:3000, category_id: 2 }];
        const saveItem = jest.fn((setSelectedItem) => {
          items = [...items, (setSelectedItem)];
        });
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} saveItem={saveItem} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
        });
        
        const CreateButton = container.querySelectorAll('Button');
        act(() => {
          CreateButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const buttonArray = document.querySelectorAll('button');
        act(() => {
          buttonArray[6].dispatchEvent(new Event('click', { bubbles: true }));
        });
        expect(saveItem).not.toHaveBeenCalled();
      });
    });
    
    describe("testing item list", () => {
      it('testing edit button', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1 , name: "ver" ,price:4000, category_id: 1 },
                  { id: 2,  name: "mer" ,price:3000, category_id: 2 }];
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} setOpenDialog={setOpenDialog} setCategoryId={setCategoryId} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
        });
        
        const Editbutton = container.querySelectorAll('Button');
        act(() => {
          Editbutton[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const inputArr = document.querySelectorAll('input');
        const SelectBox = document.querySelectorAll('select');
        expect(inputArr[0].value).toBe("ver");
        expect(inputArr[1].value).toBe("4000");
        expect(SelectBox[1].value).toBe("1");
      });
      
      it('testing delete button', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 }];
        const deleteItem = jest.fn((item) => {
          if (item.id === 1) 
                items = [{ id: 2, name: "mer" ,price:3000 , category_id: 2 }];
          else items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 }];
        });
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} categories={categories} deleteItem={deleteItem}  setOpenDialog={setOpenDialog} openDialog={openDialog} changeAuthState={changeAuthState}/>
            </Parent>
          ), container);
        });
        
        const button = container.querySelectorAll('Button');
        act(() => {
          button[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const buttonArr = document.querySelectorAll('Button');
        expect(buttonArr[5].textContent.toUpperCase()).toBe("CANCEL");
        expect(buttonArr[6].textContent.toUpperCase()).toBe("DELETE");
        act(() => {
          buttonArr[6].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(deleteItem).toHaveBeenCalled();
        const expectedItems = [{ id: 2, name: "mer" ,price:3000 , category_id: 2}];
        expect(items).toStrictEqual(expectedItems);
      });
      
      it('testing cancle button', () => {
        let categories = [ {id:1 , name : "vermeer"},{id :2, name: "merter"}];
        let items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 },
                  { id: 2, name: "mer" ,price:3000 , category_id: 2 }];
        const deleteItem = jest.fn((item) => {
          if (item.id === 1) 
                items = [{ id: 2, name: "mer" ,price:3000 , category_id: 2 }];
          else items = [{ id: 1, name: "ver" ,price:4000 , category_id: 1 }];
        });
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <ItemList items={items} deleteItem={deleteItem} categories={categories} openDialog={openDialog} setOpenDialog={setOpenDialog} changeAuthState={changeAuthState} />
            </Parent>
          ), container);
        });
        
        const button = container.querySelectorAll('Button');
        act(() => {
          button[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        
        const buttonArr = document.querySelectorAll('Button');
        act(() => {
          buttonArr[5].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(deleteItem).not.toHaveBeenCalled();
      });
    })