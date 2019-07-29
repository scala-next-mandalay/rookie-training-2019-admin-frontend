import { connect } from 'react-redux';
import ItemList from '../components/ItemList';
import { deleteItem,saveItem,setCategoryId,fetchAllItems } from '../modules/items';
import { uploadImage } from '../modules/image';

const _getItemsByCategory = (rows, categoryId) => {
  if (categoryId <= 0) {
    return rows;
  }
  else {
    const newRows = rows.filter(t => t.category_id === Number(categoryId));
    return newRows;
  }
};

export default connect(
  (state) => ({
    items: _getItemsByCategory(state.items.rows, state.items.selectedCateogryId),
    categories: state.categories.rows,
    noMoreFetch: state.items.noMoreFetch
  }),
  (dispatch) => ({
    saveItem: (item,fileName,fileData) =>  dispatch(saveItem(item,fileName,fileData)),
    deleteItem: (id) =>  dispatch(deleteItem(id)),
    setCategoryId: (categoryId) =>  dispatch(setCategoryId(categoryId)),
    fetchAllItems: () => dispatch(fetchAllItems()),
    uploadImage: (fileName, fileData) => dispatch(uploadImage(fileName, fileData)),
  })
)(ItemList);
