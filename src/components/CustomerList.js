import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Grid, Radio, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  gridControlPanel: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const CustomerList = ({ customers }) => {
  const [value, setValue] = React.useState(null);
  const classes = useStyles();
  
  const paperItems = [];
  for (const customer of customers) {
    paperItems.push(
      <Grid item xs={6} sm={4} lg={3}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box display="flex" flexDirection="row" width="100%">
              <Box my="auto" flexGrow={1}>ID: {customer.id}</Box>
              <Box my="auto">
                <Radio
                  checked={value === customer.id.toString()}
                  color="primary"
                  onChange={(e) => setValue(e.target.value)}
                  value={customer.id}
                  name="customer"
                  inputProps={{ 'aria-label': customer.name }}
                />
              </Box>
            </Box>
            <Box display="flex" fontWeight={600}>
              {customer.name}
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  }
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={7} className={classes.gridControlPanel}>
          <Box ml={0} my="auto" fontWeight={600}>
            Customers ({customers.length})
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.gridControlPanel}>
          <Box flexGrow={1} mr={1}>
            <Button 
              fullWidth
              variant="outlined" 
              size="small" 
              disabled={value === null}
            >
              Edit
            </Button>
            
          </Box>
          <Box flexGrow={1} mr={1}>
              <Button 
                fullWidth
                variant="outlined" 
                size="small" 
                disabled={value === null}
              >
                Delete
              </Button>
          </Box>
          <Box flexGrow={1} mr={1}>
            <Button 
              fullWidth
              variant="contained" 
              size="small" 
              color='secondary' 
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
    
    
    
    
      
      
    </Paper>
  );
  
  return (
    <Container maxWidth="lg">
      {paperControl}
      <Grid container>
        {paperItems}
      </Grid>
    </Container>
  );

};

const customerPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(customerPropTypes.isRequired).isRequired,
};

export default CustomerList;