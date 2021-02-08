import React from 'react';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/productsReducer';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <View></View>
    </Provider>
  );
};

export default App;
