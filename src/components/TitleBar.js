import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, IconButton, Toolbar,Menu,MenuItem,Divider,ListItemIcon, ListItemText } from '@material-ui/core';
import { 
  Menu as MenuIcon,
  AccountBalanceWallet as LogoutIcon
} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rightIcon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  imgIcon: {
    width: 30,
    height: 30,
    borderRadius: '100%'
  },
}));
const ITEM_HEIGHT = 60;
const TitleBar = ({handleDrawerToggle, signOut,locale,setLocale}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleLogout = event => {
    signOut();
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  
  const handleLocale = (event, locale) => {
    event.preventDefault();
    setLocale(locale);
    setAnchorEl(null);
  };
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          disabled={(handleDrawerToggle === null)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box fontSize="h6.fontSize" flex={1}><FormattedMessage id="Top.Title" defualtMessage="Change Title" /></Box>
 
        <IconButton
            color="inherit"
            aria-label="More"
            aria-controls="lang-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="lang-menu"
            anchorEl={anchorEl}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
      
        <MenuItem disabled={true} >
          <FormattedMessage id="Menu.Title" defualtMessage="Change Language" />
        </MenuItem>
        <Divider /> 
        
        <MenuItem className={ locale === 'ja' ? classes.selected : null }  onClick={event => handleLocale(event, 'ja')}>
          <ListItemIcon>
            <img src="https://cdn2.iconfinder.com/data/icons/world-flags-1-1/100/Japan-512.png" className={classes.imgIcon} alt='Japanese' />
          </ListItemIcon>
          <ListItemText> <FormattedMessage id="Menu.Japanese" defualtMessage="Japanese" /> </ListItemText>
        </MenuItem>
        <MenuItem className={ locale === 'en' ? classes.selected : null } onClick={event => handleLocale(event, 'en')}>
          <ListItemIcon>
            <img src="https://cdn3.iconfinder.com/data/icons/world-flags-circular-1/512/49-Great_Britain_United_Kingdom_UK_England_Union_Jack_country_flag_-512.png" className={classes.imgIcon} alt='English' />
          </ListItemIcon>
          <ListItemText> <FormattedMessage id="Menu.English" defualtMessage="English" /> </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem  onClick={handleLogout} >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText> <FormattedMessage id="Menu.SingOut" defualtMessage="Sing Out" /> </ListItemText>
        </MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  );
};

TitleBar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  signOut: PropTypes.func.isRequired,
};

TitleBar.defaultProps = {
  handleDrawerToggle: null,
};

export default TitleBar;