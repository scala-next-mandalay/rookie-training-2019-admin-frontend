import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core';
import {
    Photo as PhotoIcon, 
    Brush as BrushIcon, 
    ShoppingCart as ShoppingCartIcon,
} from '@material-ui/icons';
import './style.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
}));

const MenuList = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        <Link to = '/categories' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon ><BrushIcon /></ListItemIcon>
            <ListItemText>
              <Box>
                Artists
              </Box>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to = '/items' className={classes.link}>
          <ListItem button className="icon">
           <ListItemIcon><PhotoIcon /></ListItemIcon>
            <ListItemText>
              <Box>
                Artworks
              </Box>
            </ListItemText>
          </ListItem>
          </Link>
      </List>
      <Divider />
      <List>
        <Link to = '/orders' className={classes.link}>
          <ListItem button className="icon">
           <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText>
              <Box>
                Orders
              </Box>
            </ListItemText>
          </ListItem>
        </Link>

        
        
      </List>
    </React.Fragment>
  );
};

export default MenuList;