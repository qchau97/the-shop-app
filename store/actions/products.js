import Product from "../../models/product";

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// fetch() default method is GET
// with GET method, we don't set the 'headers' & 'body'
export const fetchProducts = () => {
  return async dispatch => {
    // Use try...catch... to handle errors
    try {
      const response = await fetch('https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/products.json');

      // (*)
      // 'ok' is a field available in 'response' onject
      // 'response.ok' is true if 'reponse' is in 200 status code range 
      // If in a different range, fetch API by default won't throw an error
      // However, we want to throw an error in this case so that we always end up in 'catch (error)' block
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const fetchedProducts = [];
      for (const key in data) {
        fetchedProducts.push(new Product(
          key,
          'u1',
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price,
        ))
      }
      dispatch({
        type: FETCH_PRODUCTS,
        payload: {
          products: fetchedProducts,
        }
      });
    } catch (error) {
      // send to custom analytics server
      throw error;
      // Error thrown here will be catched by the 'catch (error)' implemented where we called fetchProducts().
      // In addition to having try...catch..., we should also have another check as (*).
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    })
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    // any async code
    // NOTE: .json is required by Firebase ONLY
    const token = getState().auth.token;
    const response = await fetch(`https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
        price
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: data.name, // id is automatically created by Firebase
        title,
        imageUrl,
        price,
        description,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  // We are in the action creator which means we have no easy access to Redux store to get the token.
  // With the help of Redux Thunk, we have 2nd argument beside 'dispatch', which is 'getState()' function, to have all our states from Redux store when we dispatch an action.
  return async (dispatch, getState) => {
    // console.log(getState());
    const token = getState().auth.token;
    const response = await fetch(`https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
      // For editing, we have 2 methods: 
      // PUT: Fully override the resource with new data
      // PATCH: Override specified part of the resource
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id,
        title,
        imageUrl,
        description,
      },
    })
  };
};
