import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const updatedProductIndexInUserProducts = state.userProducts.findIndex(product => product.id === action.payload.id);
      const updatedProductIndexInAvailableProducts = state.availableProducts.findIndex(product => product.id === action.payload.id);

      const updatedProduct = new Product(
        action.payload.id,
        state.userProducts[updatedProductIndexInUserProducts].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[updatedProductIndexInUserProducts].price,
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[updatedProductIndexInAvailableProducts] = updatedProduct;
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[updatedProductIndexInUserProducts] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.payload),
        availableProducts: state.availableProducts.filter(product => product.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productsReducer;
