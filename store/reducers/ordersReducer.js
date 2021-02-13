import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const INITIAL_STATE = {
  orders: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.payload.items,
        action.payload.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

export default ordersReducer;
