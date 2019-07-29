import React from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper ,Box, Container, Grid, CardMedia,Card, CardActions, CardContent,Button, Dialog, 
DialogTitle,DialogContent, TextField, DialogActions,NativeSelect} from '@material-ui/core';
import { BASEURL_ITEM_IMAGES } from '../constants';
import InfiniteScroll from 'react-infinite-scroller';
import { AddPhotoAlternate as AddPhotoIcon } from '@material-ui/icons';
import { validateForm } from '../util';
import './style.css';

const uuidv1 = require('uuid/v1');
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
    paddingTop: '128%',
  },
  cardAction: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  itemBox: {
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  image: {
    width: 60,
    height: 96,
  },
  gridControlPanel:{
    marginTop:"10px",
     [theme.breakpoints.up('sm')]: {
       marginTop:"3px"
    },
  },
  textfield:{
    marginBottom:"5px",
     [theme.breakpoints.up('sm')]: {
       marginBottom:"13px"
    },
  },
  itemImgBox: {
    width: '100%',
    maxHeight: 230,
    minHeight: 180,
    borderWidth: "1px",
    borderStyle: "dotted",
    borderRadius: 4
  },

  itemImg: {
    maxWidth: '100%',
    maxHeight: 210,
    borderRadius: 4,
    resizeMode: 'contain',
    cursor: 'pointer',
  },
  defaultImg: {
    width: 85,
    height: 85,
    borderRadius: 4,
    color: '#cfcfcf',
    cursor: 'pointer',
  },
  
  btnPicker: {
    padding: '10px',
    background: 'tomato',
    color: '#fff',
    borderRadius: 4,
    cursor: 'pointer',
  },
  button:{
    border: '1px solid gray',
    backgroundColor: '#b0bec5',
  },
  diaction:{
    marginRight:'17px',
  }
}));
/*
          
          
*/

const ItemList = ({ items, categories,deleteItem,saveItem ,setCategoryId, fetchAllItems, noMoreFetch,uploadImage, user, changeAuthState, history}) => {
  const classes = useStyles();
  
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  
  const timer = React.useRef();
  
  React.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);
    
  const initialItem = {id: null, name: "", price: "", category_id: ""};
  
  const handleChangeValue = fieldName => event => {
    const newItem = {...selectedItem};
    newItem[fieldName] =  event.target.value;
    // console.log(newItem)
    setSelectedItem(newItem);
  };
  console.log('Items',items);
  const handleEdit = item => event => {
    setSelectedItem(item);
    setDialogOpen(true);
    setIsDelete(false);
    setErrors({});
    setSelectedImg(null);
  };

  const handleCloseDialog = () => {
    setSelectedImg(null);
    setDialogOpen(false);
    setIsLogin(false);
    setFile(null);
    setFileName(null);
  };
  
  const validationSetting = {
    isEmpty: ['name', 'price', 'category_id'],
    isNumeric: ['price']
  };
  
  const handleSubmit = () => {
    if (selectedItem) {
      const errs = validateForm(validationSetting, selectedItem);
      console.log('###handleSubmit###', errs);
      if (errs) {
        setErrors(errs);
      }
      else 
        {
          if (isDelete) 
          {
            deleteItem(selectedItem);
          }
          else 
          {
            if(user === null)
            {
            setIsLogin(true);
            }
            
            else
            {
            setIsLogin(false);
            saveItem(selectedItem, fileName, file);
            }
          }

          timer.current = setTimeout(() => {
          handleCloseDialog();
          //window.location.reload();
        }, 3000);
      }
    }
  };
  
   const handleLogin = event => {
    event.preventDefault();
    changeAuthState('signIn');
    history.push("/login");
  };
  
  const handleDelete = item => event => {
    setSelectedItem(item);
      setDialogOpen(true);
      setIsDelete(true);
    setErrors({});
  };
  
  const handleChangeCategory = event => {
    setCategoryId(event.target.value ? event.target.value : null);
  };
  
  const inputFile = React.useRef(null) ;
  
  const handleBrowseOpen = (e) => {
    inputFile.current.click();
  };
  
  const handleChooseFile = event => {
    event.preventDefault();
    
    let reader = new FileReader();
    let file = event.target.files[0];

    //create dynamic name
    const fname = uuidv1()+".png";

    //add file name in state
    const newItem = { ...selectedItem };
    newItem['image'] = fname;
    setSelectedItem(newItem);

    setFile(file);
    setFileName(fname);

    //get url img for preview

    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const deleteDialog = (selectedItem && isDelete) ? (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog} 
      aria-labelledby="item-delete-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="item-delete-dialog">
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <Box>Do you really want to delete {selectedItem.id}: {selectedItem.name}.</Box>
        <Box fontWeight={600}></Box>
      </DialogContent>
      <DialogActions className={classes.diaction}>
        <Button onClick={handleCloseDialog} color="primary" className={classes.button}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" className={classes.button}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
  
  const saveDialog = (selectedItem && isDelete === false) ? (
    <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {selectedItem.id ? "Edit (ID:"+selectedItem.id+")" : "Create"}
        {isLogin ? <Box color="red" >You don't have Upload Permission. <Button onClick={handleLogin} color="secondary" >sign in</Button></Box> : null}
      </DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textfield}
          variant="outlined"
          autoFocus
          id="name"
          label="Name"
          value={selectedItem.name}
          onChange={handleChangeValue("name")}
          error={errors.name ? true : false}
          fullWidth
        />
        <TextField
          className={classes.textfield}
          variant="outlined"
          
          id="price"
          label="Price"
          value={selectedItem.price}
          onChange={handleChangeValue("price")}
          error={errors.price ? true : false}
          fullWidth
        />
        <TextField
        id="outlined-select-currency"
        select
        label="Category"
        className={classes.textField}
        value={selectedItem.category_id}
        onChange={handleChangeValue("category_id")}
        margin="normal"
        variant="outlined"
        helperText="Please select your category"
      >
        {categories.map((category) => {
            return (<option key={category.id} value={category.id} style={{padding:"5px 10px",}}>{category.name}</option>);
          })}
      </TextField>
        
        <Grid>

          {selectedItem.id === null ?
            <Grid>
                <Box textAlign="center"  p={1} my={2} className={classes.itemImgBox} >
                  {selectedImg === null ? 
                    <Box textAlign="center" pt={1}>
                      <Box><AddPhotoIcon className={classes.defaultImg} onClick={() => handleBrowseOpen()} /></Box>
                      <label className={classes.btnPicker}>
                        <TextField onChange={handleChooseFile} type="file" id="file" name="file" ref={inputFile} style={{ display: 'none' }} ></TextField>
                        Choose File
                      </label>
                    </Box>
                    : 
                    <Box>
                      <img src={selectedImg} onClick={() => handleBrowseOpen()} className={classes.itemImg} alt={selectedItem.image}  />
                      <label>
                        <TextField onChange={handleChooseFile} type="file" id="file" name="file" ref={inputFile} style={{ display: 'none' }} ></TextField>
                      </label>
                    </Box>
                  }
                </Box>
            </Grid>
            :
            <Grid>
              <Box textAlign="center"  p={1} my={2} className={classes.itemImgBox} >
                <img src={ selectedImg ? selectedImg : BASEURL_ITEM_IMAGES + selectedItem.image} onClick={() => handleBrowseOpen()} alt={selectedItem.image} className={classes.itemImg} />
                <label>
                  <TextField onChange={handleChooseFile} type="file" id="file" name="file" ref={inputFile} style={{ display: 'none' }} ></TextField>
                </label>
              </Box>
            </Grid>
          }
        </Grid>
        
      </DialogContent>
      <DialogActions className={classes.diaction}>
        <Button onClick={handleCloseDialog} color="primary" className={classes.button}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" className={classes.button}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  ):null;
  
  
  const paperItems = [];
  for (const item of items) {
    paperItems.push(
      <Grid key={item.id} item xs={12} sm={4} lg={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={BASEURL_ITEM_IMAGES+item.image}
            title={item.name}
          />
          
          
          <CardContent >
            <Box fontWeight={600}>
             {item.name}
            </Box>
            <Box>
              Price: {item.price} Ks
            </Box>
          </CardContent>
          
          <CardActions className={classes.cardAction}>
            <Box ml="auto">
              <Button color="primary" onClick={handleEdit(item)}>
                Edit
              </Button>
            </Box>
            <Box ml="auto" mr={0}>
              <Button color="primary" onClick={handleDelete(item)}>
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={6} sm={1} className={classes.gridControlPanel}>
          <Box ml={0} my="auto" fontWeight={600}  flexDirection="row" display="flex">
            Artworks ({items.length})
          </Box>
        </Grid>
        <Grid item xs={6} sm={10} className={classes.gridControlPanel}>
        <NativeSelect
              className={classes.inputField}
              error={errors.category_id ? true : false}
              onChange={handleChangeCategory}
              >
              <option value="">All categories</option>
              {categories.map((category) => {
                return (<option key={category.id} value={category.id}>{category.name}</option>);
              })}
            </NativeSelect></Grid>
        <Grid item xs={12} sm={1} className={classes.gridControlPanel}>
          <Box mr={1}>
            <Button 
              fullWidth
              variant="contained" 
              size="small" 
              color="secondary" 
              onClick={handleEdit(initialItem)}
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchAllItems}
      hasMore={!noMoreFetch}
      initialLoad={true}
      loader={<div className="loader" key={0}></div>}
    >
      <Container maxWidth="lg">
        {paperControl}
        <Grid container>
          {paperItems}
        </Grid>
        {saveDialog}
        {deleteDialog}
      </Container>
    </InfiniteScroll>
  );
};

export default ItemList;