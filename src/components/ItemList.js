import React from 'react'
//import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper ,Box, Container, Grid, CardMedia,Card, CardActions, CardContent,Button, Dialog, 
DialogTitle,DialogContent, TextField, DialogActions, Select, FilledInput,NativeSelect} from '@material-ui/core'
import { BASEURL_ITEM_IMAGES } from '../constants'
import InfiniteScroll from 'react-infinite-scroller'
import { validateForm } from '../util'
import './style.css'

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
  }
}))
/*
          
          
*/

const ItemList = ({ items, categories,deleteItem,saveItem ,setCategoryId, fetchAllItems, noMoreFetch}) => {
  const classes = useStyles()
  
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedItem, selectItem] = React.useState(null)
  const [errors, setErrors] = React.useState({})

  const handleChangeValue = fieldName => event => {
    const newItem = {...selectedItem}
    newItem[fieldName] =  event.target.value
    // console.log(newItem)
    selectItem(newItem)
  }
  
  // const handleChangeCategoryId = event => {
  //   alert(event.target.value)
  // }

  const initialForm = {name: ""}
  const handleEdit = (item = initialForm) => event => {
    // console.log('MYITEM',item)
    selectItem(item)
    setDialogOpen(true)
    setErrors({})
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  
  const validationSetting = {
    isEmpty: ['name', 'price', 'category_id'],
    isNumeric: ['price']
  }
  
  const handleSubmit = () => {
    console.log('MYITEM',selectedItem)
    if (selectedItem) {
      const errs = validateForm(validationSetting, selectedItem)
      console.log('###handleSubmit###', errs)
      if (errs) {
        setErrors(errs)
      }
      else{
      saveItem(selectedItem)
      }
    }
    setDialogOpen(false)
  }
  const handleDelete = (item) => event => {
    console.log('Item')
    deleteItem(item);
    setErrors({})
  }
  const handleChangeCategory = event => {
    setCategoryId(event.target.value)
  }
  const dialog = (selectedItem === null) ? null : (
    <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          value={selectedItem.name}
          onChange={handleChangeValue("name")}
          error={errors.name ? true : false}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          value={selectedItem.price}
          onChange={handleChangeValue("price")}
          error={errors.price ? true : false}
          fullWidth
        />
        <Select
          value={selectedItem.category_id}
          onChange={handleChangeValue("category_id")}
          error={errors.category_id ? true : false}
          input={<FilledInput name="age" id="filled-age-simple" />}
        >
          {categories.map((category) => {
            return (<option value={category.id} style={{padding:"5px 10px"}}>{category.name}</option>)
          })}
      </Select>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
  
  
  const paperItems = []
  for (const item of items) {
    paperItems.push(
      <Grid item xs={12} sm={4} lg={3}>
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
    )
  }
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={6} sm={1} className={classes.gridControlPanel}>
          <Box ml={0} my="auto" fontWeight={600}  flexDirection="row" display="flex">
            Artworks ({items.length})
          </Box>
        </Grid>
        <Grid item xs={6} sm={9} className={classes.gridControlPanel}>
        <NativeSelect
              className={classes.inputField}
              error={errors.category_id ? true : false}
              onChange={handleChangeCategory}
              >
              <option value="ALL"></option>
              {categories.map((category) => {
                return (<option value={category.id}>{category.name}</option>)
              })}
            </NativeSelect></Grid>
        <Grid item xs={12} sm={2} className={classes.gridControlPanel}>
          <Box mr={1}>
            <Button 
              fullWidth
              variant="contained" 
              size="small" 
              color="secondary" 
              onClick={handleEdit()}
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )

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
        {dialog}
      </Container>
    </InfiniteScroll>
  )
}

export default ItemList
