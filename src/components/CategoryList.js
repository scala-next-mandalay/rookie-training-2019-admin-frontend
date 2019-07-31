import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Dialog, 
DialogTitle,DialogContent, TextField, DialogActions ,Grid, Button } from '@material-ui/core';
import { validateForm } from '../util';

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
  button:{
    border: '1px solid gray',
    backgroundColor: '#c5cae9',
  },
  diaction:{
    marginRight:'17px',
  }
}));

const CategoryList = ({ categories, category, saveCategory,deleteCategory}) => {
  // const [value, setValue] = React.useState(null)
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const initialCategory = {id: null, name: ""};
  
  const handleChangeValue = fieldName => event => {
    const newCategory = {...selectedCategory};
    newCategory[fieldName] =  event.target.value;
    setSelectedCategory(newCategory);
  };
  
  const handleEdit = category => event => {
    setSelectedCategory(category);
    setDialogOpen(true);
    setIsDelete(false);
    setErrors({});
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
  };
  
  const validationSetting = {
    isEmpty: ['name'],
  };
  
  const handleSubmit = () => {
    if (selectedCategory) {
      const errs = validateForm(validationSetting, selectedCategory);
      if (errs) {
        setErrors(errs);
      }
      else {
        if (isDelete) {
          console.log(selectedCategory);
          deleteCategory(selectedCategory);
        }
        else {
          saveCategory(selectedCategory);
        }
        handleCloseDialog();
      }
    }
  };

  const handleDelete = (category) => event => {
    setSelectedCategory(category);
    setDialogOpen(true);
    setIsDelete(true);
    setErrors({});
  };
  
  
  const deleteDialog = (selectedCategory && isDelete) ? (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog} 
      aria-labelledby="category-delete-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="category-delete-dialog">
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <Box>Do you really want to delete {selectedCategory.id}: {selectedCategory.name}.</Box>
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

  const saveDialog = (selectedCategory && isDelete === false) ? (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog} 
      aria-labelledby="category-save-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="category-save-dialog" >
        {selectedCategory.id ? "Edit (ID:"+selectedCategory.id+")" : "Create"}
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          autoFocus
          error={errors.name ? true : false}
          id="name"
          label="Name"
          value={selectedCategory.name}
          onChange={handleChangeValue("name")}
          fullWidth
        />
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
  ) : null;
      
  const paperItems = [];
  for (const category of categories) {
    paperItems.push(
      <Grid key={category.id} item xs={12} sm={4} lg={3}>
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
    );
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
              onClick={handleEdit(initialCategory)}
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
  
  
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        {paperControl}
        <Grid container>
          {paperItems}
        </Grid>
      </Container>
      {saveDialog}
      {deleteDialog}
    </React.Fragment>
  );
  };

const categoryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes.isRequired).isRequired,
};

export default CategoryList;