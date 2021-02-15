import Order from "../../models/order";
import { ADD_ORDER, FETCH_ORDERS } from "../actions/orders";

const INITIAL_STATE = {
  orders: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        orders: action.payload.orders,
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date,
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
