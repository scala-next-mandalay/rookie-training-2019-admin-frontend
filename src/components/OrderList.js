import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tabs,Tab,Typography,Box,TableHead,TableRow,TableCell,TableSortLabel,Grid,Toolbar,TextField,Paper,Table,TableBody,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { FormattedMessage } from 'react-intl';

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
}));

const headRows = [
  { id: 'created_at', numeric: false, disablePadding: false, label: <FormattedMessage id="Label.Date"/> },
  { id: 'first_name', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Customer"/> },
  { id: 'address1', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Address1"/> },
  { id: 'address2', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Address2"/> },
  { id: 'country', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Country"/> },
  { id: 'state', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.State"/> },
  { id: 'city', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.City"/> },
  { id: 'total_price', numeric: true, disablePadding: false, label: <FormattedMessage id="Label.Total"/> },
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
};

const useToolbarStyles = makeStyles(theme => ({
  title: {
    flex: '0 0 auto',
  },
  spacer: {
    flex: '1 1 100%',
  },
}));

const OrderList = ({orders,setSearchText,searchText,fetchAllOrderItems,fetchAllOrders, orderItems,sorting}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [text, setText] = React.useState("");
  const [nextRow,setnextRow] = React.useState(0);
  const [order,setOrder] = React.useState('asc');
  const [orderBy,setOrderBy] = React.useState('created_at');
  
  const isFirstRef = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAllOrders(0);
    }
  });
  
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');  //true is asc
    setOrderBy(property);
    sorting(property,isDesc ? 'asc' : 'desc');
  };
  
  const handleChangeSearch = (event) => {
    if(event.target.value === "")
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
  
  const IncrementItem = () => {
    setnextRow(nextRow + 10);
    fetchAllOrders(nextRow+10);
  };
  const DecreaseItem = () => {
    setnextRow(nextRow - 10);
    fetchAllOrders(nextRow-10);
  };
  
  const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();

    return (
      <Toolbar>
        <div className={classes.title}>
          <div className="input-group">
	      		<TextField
              autoFocus
              id="standard-search"
              type="search"
              placeholder ="Search"
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
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Box flexDirection="row" display="flex">
             <Button disabled={nextRow > 0 ? false : true} variant="contained" size="medium" color="primary" width="50" onClick={DecreaseItem} style={{marginRight:10}}>
              <FormattedMessage id="Button.Prev"/>
            </Button>
            <Button disabled={orders.length < 10 ? true :false}  variant="contained" size="medium" color="primary" width="50" onClick={IncrementItem}>
              <FormattedMessage id="Button.Next"/>
            </Button>
          </Box>
        </div>
      </Toolbar>
    );
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const link = id=> () => {
    fetchAllOrderItems(id);
  };
  const Show = (
    
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
            />
            <TableBody>
              {
                orders.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" scope="row">
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
                })
              }
            </TableBody>
          </Table>
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
            <LinkTab label={<FormattedMessage id="Label.Ordered"/>} href="/drafts" {...a11yProps(0)} />
            <LinkTab label={<FormattedMessage id="Label.Delivered"/>} href="/trash" {...a11yProps(1)} />
            <LinkTab label={<FormattedMessage id="Label.Cancelled"/>} href="/spam" {...a11yProps(2)} />
          </Tabs>
        <TabPanel value={value} index={0}>
          {Show}
        </TabPanel>
        <TabPanel value={value} index={1}>
          
        </TabPanel>
        <TabPanel value={value} index={2}>
          
        </TabPanel>
        </Grid>
      </Grid>
    </Paper>
  );

};

export default OrderList;