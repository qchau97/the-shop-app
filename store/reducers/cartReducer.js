import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

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
  }
  return state;
};

export default cartReducer;