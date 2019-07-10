import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Paper, Dialog, 
DialogTitle,DialogContent, TextField, DialogActions ,Grid, Button } from '@material-ui/core'

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
}))

const CategoryList = ({ categories, category, saveCategory,deleteCategory }) => {
  // const [value, setValue] = React.useState(null)
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedCategory, selectCategory] = React.useState(null)

  const handleChangeValue = fieldName => event => {
    const newCategory = {...selectedCategory}
    newCategory[fieldName] =  event.target.value
    //console.log(newCategory)
    selectCategory(newCategory)
  }
  
  const initialForm = {name: ""}
  const handleEdit = (category = initialForm) => event => {
    console.log('MYCATEGORY',category)
    selectCategory(category)
    setDialogOpen(true)
  }
  
  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  
  const handleSubmit = () => {
    if (selectedCategory) {
      saveCategory(selectedCategory)
    }
    setDialogOpen(false)
  }
  

  const handleDelete = (category) => event => {
    deleteCategory(category);
  }
  
  
  let dialog = null
  if (selectedCategory) {
    const idField = selectedCategory.id ? (
      <TextField
        autoFocus
        margin="dense"
        id="id"
        label="ID"
        value={selectedCategory.id}
        onChange={handleChangeValue("id")}
        fullWidth
      />
    ) : null
    
    
    dialog = (
      <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
            {idField}
          <TextField
            autoFocus
            id="name"
            margin="dense"
            label="Name"
            value={selectedCategory.name}
            onChange={handleChangeValue("name")}
            fullWidth
          />
          
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
  }
      

  const paperItems = []
  for (const category of categories) {
    paperItems.push(
      <Grid item xs={12} sm={4} lg={3}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box my="auto">ID: {category.id}</Box>
            <Box display="flex" fontWeight={600}>
              {category.name}
            </Box>
            <Box mt={1} mr={0} ml="auto">
              <Button color="primary" onClick={handleEdit(category)}>
                Edit
              </Button>
              <Button color="primary" onClick={handleDelete(category)}>
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    )
  }
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={6} sm={11} className={classes.gridControlPanel}>
          <Box ml={0} my="auto" fontWeight={600}>
            Artists ({categories.length})
          </Box>
        </Grid>
        <Grid item xs={6} sm={1} className={classes.gridControlPanel}>
          <Box flexGrow={1} mr={1}>
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
    <Container maxWidth="lg">
      {paperControl}
      <Grid container>
        {paperItems}
      </Grid>
      {dialog}
    </Container>
  )
  }

const categoryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes.isRequired).isRequired,
}

export default CategoryList
