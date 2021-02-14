export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

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
