import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
import authReducer from './store/reducers/authReducer';
import cartReducer from './store/reducers/cartReducer';
import ordersReducer from './store/reducers/ordersReducer';
import productsReducer from './store/reducers/productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Since we setup Redux here, Redux store is only available inside 'ShopNavigator'
// SOLUTION: Wrap 'ShopNavigator' inside another component, which is 'NavigationContainer', so that we have access to Redux store from that component
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
