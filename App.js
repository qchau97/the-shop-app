import React from 'react';
import { Text } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cartReducer';
import productsReducer from './store/reducers/productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
})

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
