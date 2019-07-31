import React from 'react';
import PropTypes from 'prop-types';
import { lighten,makeStyles } from '@material-ui/core/styles';
import {Typography ,Paper,Grid,Table,TableBody,TableCell,TableHead,TablePagination,
    TableRow,TableSortLabel,Toolbar,Tooltip,Box,Divider

} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

const TabContainer = (props) =>{
  return (
    <Typography component="div" style={{ padding: 1 * 1 }}>
      {props.children}
    </Typography>
  );
};

const headRows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Product Name' },
  { id: 'unit_price', numeric: true, disablePadding: false, label: 'Item_Price' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total ($)' },
];

const useStyles = makeStyles(theme => ({
  root:{
        paddingTop:theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
     [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  title:{
    margin:'15px',
  },
  info: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  add:{
    fontWeight:10,
    paddingTop:'10px'
  },
}));

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
    marginBottom: theme.spacing(2),
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
        <div className={classes.title}>
              <Typography variant="h5" gutterBottom style={{paddingTop:"20px"}}>
                OrderItems
              </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
      </div>
    </Toolbar>
  );
};

const OrderItemList = ({orderitems, loading}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property)=> {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  
  // let obj = {};
  // rows=[];// eslint-disable-next-line
  // orderitems.map((orderitem,index)=> {
  //   console.log('orderitem:',orderitems);
  //   console.log('items:',items);
  //   let arr1 = items.filter(i => i.id === orderitem.item_id);
  //   let c = {name: arr1[0].name};
  //   let arr = orders.filter(o => o.id === orderitem.order_id );
  //   if(arr.length > 0) {
  //     let a ={total: orderitem.unit_price*orderitem.quantity};
  //     let b ={address1: arr[0].address1,address2: arr[0].address2};
  //     obj = {...orderitem,...a,...b,...c};
  //     rows.push(obj);
  //   }
  //   console.log('new',rows);
  // });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orderitems.length - page * rowsPerPage);

  const ccyFormat = (num) =>{
  //return `${num.toFixed(2)}`;
  return num ? `${num.toFixed(2)}` : '@';
};
  const TAX_RATE = 0.00;
  const invoiceSubtotal = orderitems.length > 0 ? orderitems[0].total_price : null;
  const invoiceTaxes = 30;
  const invoiceTotal = invoiceSubtotal + invoiceTaxes;
  const PCGrid=(
              <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    >
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={orderitems.length}
                    />
                    <TableBody>
                      {orderitems.map((orderitem, index) => {
                        
                        
                          const labelId = `enhanced-table-checkbox-${index}`;
        
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={orderitem.name}
                            >
                              <TableCell component="th" id={labelId} scope="row">
                                {orderitem.name}
                              </TableCell>
                              <TableCell align="right">{ccyFormat(orderitem.unit_price)}</TableCell>
                              <TableCell align="right">Ordered : {orderitem.quantity}</TableCell>
                              <TableCell align="right">{ccyFormat(orderitem.unit_price * orderitem.quantity)}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell align="center">Subtotal</TableCell>
                          <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell align="center">Tax ({`${(TAX_RATE * 100).toFixed(0)} %`})</TableCell>
                          <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell align="center">Total</TableCell>
                          <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 30 * emptyRows }}>
                          <TableCell colSpan={9} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
  );
  
  const newPaper = (
      <Grid container>
        <Grid item xs={12} sm={12}>
        <Typography variant="h6" gutterBottom className={classes.title}>
            Order Information
        </Typography>
        <Divider />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.info}>
          <Box ml={0} my="auto" fontWeight={600}>
            <Grid item sm={12}>Shipping Address </Grid>
            <Grid item sm={12} className={classes.add}>{orderitems.length >0 ? orderitems[0].address1:null}</Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.info}>
          <Box ml={0} my="auto" fontWeight={600}>
            <Grid item sm={12}>Billing Address </Grid>
            <Grid item sm={12} className={classes.add}>{orderitems.length >0 ? orderitems[0].address2:null}</Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.info}>
          <Box ml={0} my="auto" fontWeight={600}>
            <Grid item sm={12}>Shipping Date </Grid> 
            <Grid item sm={12} style={{paddingTop:'10px'}}>5/7/2019 10/7/2019</Grid>
          </Box>
        </Grid>
      </Grid>
  );
  const paperControl = (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={12} className={classes.gridControlPanel}>
          
        <EnhancedTableToolbar />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.gridControlPanel}>
            <TabContainer>
                {PCGrid}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={orderitems.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                {newPaper}
            </TabContainer>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <div className={classes.root}>
        {loading ? <h2>..... Loading</h2> : paperControl}
    </div>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const orderitemPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
});
OrderItemList.propTypes = {
  orderitems: PropTypes.arrayOf(orderitemPropTypes.isRequired).isRequired,
};
export default OrderItemList;