import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography ,Paper,Grid,Table,TableBody,TableCell,TableHead,TablePagination,
    TableRow,Toolbar,Box,Divider

} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const headRows = [
  { id: 'name', numeric: false, disablePadding: false, label: <FormattedMessage id="Label.ItemName"/> },
  { id: 'unit_price', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.ItemPrice"/> },
  { id: 'quantity', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Quantity"/> },
  { id: 'total', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Total"/> },
];

const useStyles = makeStyles(theme => ({
  root:{
        paddingTop:theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
     [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },overflowX:'auto',
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
  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            padding={row.disablePadding ? 'none' : 'default'}
            align={row.numeric ? 'right' : 'left'}
          >
              {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
          <FormattedMessage id="Orderitem.Title"/>
        </Typography>
      </div>
    </Toolbar>
  );
};

const OrderItemList = ({orderitems, loading}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
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
  const newPaper = (
      <Grid container>
        <Grid item xs={12} sm={12}>
        <Typography variant="h6" gutterBottom className={classes.title}>
            <FormattedMessage id="Label.Orderinfo"/>
        </Typography>
        <Divider />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.info}>
          <Box ml={0} my="auto" fontWeight={600}>
            <Grid item sm={12}><FormattedMessage id="Label.ShippingAddress"/> </Grid>
            <Grid item sm={12} className={classes.add}>{orderitems.length >0 ? orderitems[0].address1:null}</Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.info}>
          <Box ml={0} my="auto" fontWeight={600}>
            <Grid item sm={12}><FormattedMessage id="Label.BillingAddress"/> </Grid>
            <Grid item sm={12} className={classes.add}>{orderitems.length >0 ? orderitems[0].address2:null}</Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.info}>
          <Box ml={0} my="auto" fontWeight={600}>
            <Grid item sm={12}><FormattedMessage id="Label.ShippingDate"/> </Grid> 
            <Grid item sm={12} style={{paddingTop:'10px'}}>5/7/2019 10/7/2019</Grid>
          </Box>
        </Grid>
      </Grid>
  );
  const PCGrid=(
      <Paper className={classes.root}>
          <EnhancedTableToolbar />
              <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    >
                    <EnhancedTableHead classes={classes}
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
                              <TableCell align="right">{orderitem.quantity}</TableCell>
                              <TableCell align="right">{ccyFormat(orderitem.unit_price * orderitem.quantity)}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell align="center"><FormattedMessage id="Label.SubTotal"/></TableCell>
                          <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell align="center"><FormattedMessage id="Label.Tax"/> ({`${(TAX_RATE * 100).toFixed(0)} %`})</TableCell>
                          <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} />
                          <TableCell align="center"><FormattedMessage id="Label.Total"/></TableCell>
                          <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 30 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                </Table>
              </div>
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
      </Paper>
  );
  
  

  return (
    <div>
        {loading ? <h2>..... Loading</h2> : PCGrid}
    </div>
  );
};

const orderitemPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
});
OrderItemList.propTypes = {
  orderitems: PropTypes.arrayOf(orderitemPropTypes.isRequired).isRequired,
};
export default OrderItemList;