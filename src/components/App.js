import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Box } from '@material-ui/core';
import theme from '../theme';
import ToolbarSpacer from './ToolbarSpacer';
import Header from './Header';
import CategoryList from '../containers/CategoryList';
import OrderList from '../containers/OrderList';
import ItemList from '../containers/ItemList';
import OrderItemList from '../containers/OrderItemList';

import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import Login from '../containers/Login';
Amplify.configure(aws_exports);

const App = ({locale,fetchAllCategories,fetchAllCustomers, fetchAllItems,fetchAllOrders,fetchAuthedUser, user, refreshToken}) => {
  const isFirstRef = React.useRef(true);
  
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser();
    }
    //
    //fetchAllCustomers()
    fetchAllCategories();
    fetchAllItems();
    fetchAllOrders();
    
    const timer = window.setInterval(() => {
      refreshToken();
    }, 600000); //after 10 minutes to call refreshToken()
    return () => { // Return callback to run on unmount.
      window.clearInterval(timer);
    };
  });

  const auth = (
      <Router>
        <CssBaseline />
        <Box display="flex">
          <Header />
          <Box flexGrow={1} display="flex" flexDirection="column">
            <ToolbarSpacer />
            <Route exact path="/" render={() => {
              return <CategoryList />;
            }} />
            <Route exact path="/categories" render={() => {
              return <CategoryList />;
            }} />
            <Route exact path="/items" render={() => {
              return <ItemList />;
            }} />
            <Route exact path="/orders" render={() => {
              return <OrderList />;
            }} />
            <Route exact path="/orderitems" render={() => {
              return <OrderItemList />;
            }} />
            <Route exact path="/login" render={() => {
              return <Login />;
            }} />
          </Box>
        </Box>
      </Router>
  );
  
  const contents = user ? auth : <Login />;
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        {contents}
      </Router>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  fetchAllCategories: PropTypes.func,
  fetchAllCustomers: PropTypes.func,
  fetchAllItems: PropTypes.func,
  fetchAllOrders: PropTypes.func,
};

export default App;