import PRODUCTS from '../../data/dummy-data';
const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    default: 
    return state;
  }
};

export default productsReducer;