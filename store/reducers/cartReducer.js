import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const INITIAL_STATE = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedItem = action.payload.product;
      const itemPrice = addedItem.price;
      const itemTitle = addedItem.title;
      let updatedOrNewItem;

      if (state.items[addedItem.id]) {
        updatedOrNewItem = new CartItem(
          state.items[addedItem].quantity + 1,
          itemPrice,
          itemTitle,
          state.items[addedItem].sum + itemPrice
        );
      } else {
        updatedOrNewItem = new CartItem(1, itemPrice, itemTitle, itemPrice * 1);
      }
      return {
        ...state,
        items: { ...state.items, [addedItem.id]: updatedOrNewItem },
        totalAmount: totalAmount + itemPrice,
      }
    default:
      return state;
  }
};

export default cartReducer;