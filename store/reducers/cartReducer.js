import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedItem = action.payload;
      const itemPrice = addedItem.price;
      const itemTitle = addedItem.title;
      let updatedOrNewItem;

      if (state.items[addedItem.id]) {
        updatedOrNewItem = new CartItem(
          state.items[addedItem.id].quantity + 1,
          itemPrice,
          itemTitle,
          state.items[addedItem.id].sum + itemPrice
        );
      } else {
        updatedOrNewItem = new CartItem(1, itemPrice, itemTitle, itemPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedItem.id]: updatedOrNewItem },
        totalAmount: state.totalAmount + itemPrice,
      };
    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.payload];
      const currentQuantity = selectedItem.quantity;
      let updatedItems;
      if (currentQuantity > 1) {
        const updatedItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updatedItems = { ...state.items, [action.payload]: updatedItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.payload];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };
    case ADD_ORDER:
      return INITIAL_STATE;
    case DELETE_PRODUCT:
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedCartItems = { ...state.items };
      const deletedTotalAmount = state.items[action.payload].sum;
      delete updatedCartItems[action.payload];
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - deletedTotalAmount,
      };
    default:
      return state;
  }
};

export default cartReducer;
