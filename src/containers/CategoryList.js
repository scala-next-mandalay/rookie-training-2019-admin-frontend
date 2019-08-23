import { connect } from 'react-redux';
import CategoryList from '../components/CategoryList';
import { saveCategory, deleteCategory,dialogBox } from '../modules/categories';

export default connect(
  (state) => ({
    categories: state.categories.rows,
    closeDialog: state.categories.closeDialog,
    loading:state.categories.loading,
  }),
  (dispatch) => ({
    saveCategory: (category) => dispatch(saveCategory(category)),
    deleteCategory: (category) => dispatch(deleteCategory(category)),
    dialogBox: (val) => dispatch(dialogBox(val)),
  })
)(CategoryList);