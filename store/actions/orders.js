import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const date = new Date();
      const response = await fetch(`https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(), // get the same timestamp in standardized format
        })
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      dispatch({
        type: ADD_ORDER,
        payload: {
          id: data.name,
          items: cartItems,
          amount: totalAmount,
          date: date
        }
      })
    } catch (error) {
      throw new Error('Something went wrong!');
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/orders/${userId}.json`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const fetchedOrders = [];
      for (const key in data) {
        fetchedOrders.push(new Order(
          key,
          data[key].cartItems,
          data[key].totalAmount,
          new Date(data[key].date), // Here we got back from our server the date string, wrap it inside new Date() to create a date object
        ))
      }
      dispatch({
        type: FETCH_ORDERS,
        payload: {
          orders: fetchedOrders,
        }
      });
    } catch (error) {
      throw error;
    }
  };
};