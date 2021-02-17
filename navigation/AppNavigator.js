import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer is like createAppContainer() in version 4
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductsNavigator } from './ShopNavigator';

const AppNavigator = props => {
  const isUserAuthenticated = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
