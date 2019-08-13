import { combineReducers } from 'redux';
import { categoriesReducer } from './categories';
import { ordersReducer } from './orders';
import { itemsReducer } from './items';
import { orderitemsReducer } from './orderitems';
import { localeReducer } from './locale';
import { authReducer } from './auth';

export default combineReducers({
  categories: categoriesReducer,
  orders: ordersReducer,
  items: itemsReducer,
  orderitems: orderitemsReducer,
  locale: localeReducer,
  auth: authReducer,
});
