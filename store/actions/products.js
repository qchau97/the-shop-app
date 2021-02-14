import Product from "../../models/product";

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// fetch() default method is GET
// with GET method, we don't set the 'headers' & 'body'
export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch('https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/products.json');
    const data = await response.json();
    // console.log(data);
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
  }
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async dispatch => {
    // any async code
    // NOTE: .json is required by Firebase ONLY
    const response = await fetch('https://rn-complete-guide-247d9-default-rtdb.firebaseio.com/products.json', {
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
    const data = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: data.name,
        title,
        imageUrl,
        price,
        description,
      },
    });
  };
};
export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      imageUrl,
      description,
    },
  };
};
