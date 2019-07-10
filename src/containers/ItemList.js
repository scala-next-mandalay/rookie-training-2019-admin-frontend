import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { deleteItem,saveItem,setCategoryId,fetchAllItems } from '../modules/items'

const _getItemsByCategory = (rows, categoryId) => {

  if (categoryId <= 0) {
    return rows
  }
  else {

    const newRows = rows.filter(t => t.category_id === parseInt(categoryId))
    console.log('_getItemsByCategory2', rows)
    return newRows
  }
}

export default connect(
  (state) => ({
    items: _getItemsByCategory(state.items.rows, state.items.selectedCateogryId),
    categories: state.categories.rows,
    noMoreFetch: state.items.noMoreFetch
  }),
  (dispatch) => ({
    saveItem: (item) =>  dispatch(saveItem(item)),
    deleteItem: (id) =>  dispatch(deleteItem(id)),
    setCategoryId: (categoryId) =>  dispatch(setCategoryId(categoryId)),
    fetchAllItems: () => dispatch(fetchAllItems()),
  })
)(ItemList)
