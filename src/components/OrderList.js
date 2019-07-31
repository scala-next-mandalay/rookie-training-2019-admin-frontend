import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten,makeStyles } from '@material-ui/core/styles';
import {Tabs,Tab,Typography,Box,TableHead,TableRow,TableCell,TableSortLabel,Grid,Toolbar,TextField,Paper,Table,TableBody,TablePagination,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) =>{
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
};

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};


const useStyles = makeStyles(theme => ({
  root:{
        paddingTop:theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
     [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
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

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

const headRows = [
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'first_name', numeric: true, disablePadding: false, label: 'Customer' },
  { id: 'address1', numeric: true, disablePadding: false, label: 'Address1' },
  { id: 'address2', numeric: true, disablePadding: false, label: 'Address2' },
  { id: 'country', numeric: true, disablePadding: false, label: 'Country' },
  { id: 'state', numeric: true, disablePadding: false, label: 'State' },
  { id: 'city', numeric: true, disablePadding: false, label: 'City' },
  { id: 'total_price', numeric: true, disablePadding: false, label: 'Total ($)' },
];

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
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
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
  title: {
    flex: '0 0 auto',
  },
}));

const OrderList = ({orders,setSearchText,searchText,fetchAllOrderItems,fetchAllOrders, orderItems}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [text, setText] = React.useState("");

  const isFirstRef = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRef.current) {
      fetchAllOrders();
    }
  });

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  const handleChangeSearch = (event) => {
    if(event.target.value == "")
    {
      setSearchText("");
    }
    let chgText="";
    chgText=event.target.value;
    setText(chgText);
  };
  const AddText = () =>{
    setSearchText(text);
  };
  
  const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();

    return (
      <Toolbar
        className={clsx(classes.root)}
      >
        <div className={classes.title}>
          <div className="input-group">
	      		<TextField
              autoFocus
              id="standard-search"
              type="search"
              placeholder="Search"
              margin="dense"
              className={classes.textField}
              value={text}
              onChange={handleChangeSearch}
             />
	      		<Button onClick={AddText} variant="contained" size="medium" color="primary" width="50">
              <SearchIcon />
            </Button>
	      	</div>
        </div>
      </Toolbar>
    );
  };

  const handleChangePage = (event, newPage) =>{
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) =>{
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const link = id=> () => {
    fetchAllOrderItems(id);
    
  };
  const Show = (
    <div>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={orders.length}
            />
            <TableBody>
              {stableSort(orders, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.created_at}
                      </TableCell>
                      <TableCell align="right"><Link to="/orderitems" replace onClick={link(row.id)}>{row.first_name} {row.last_name}</Link></TableCell>
                      <TableCell align="right">{row.address1}</TableCell>
                      <TableCell align="right">{row.address2}</TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.total_price}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </div>
  );
  
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} className={classes.gridControlPanel}>
          <EnhancedTableToolbar />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.gridControlPanel}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Ordered" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Delivered" href="/trash" {...a11yProps(1)} />
            <LinkTab label="Cancelled" href="/spam" {...a11yProps(2)} />
          </Tabs>
        <TabPanel value={value} index={0}>
          {Show}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Page Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Page Three
        </TabPanel>
        </Grid>
      </Grid>
      </Paper>
  );

};

export default OrderList;