import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer is like createAppContainer() in version 4
import React from 'react';
import { useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import { ShopNavigator, AuthNavigator } from './ShopNavigator';


const AppNavigator = props => {
  const isUserAuthenticated = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isUserAuthenticated && <ShopNavigator />}
      {!isUserAuthenticated && didTryAutoLogin && <AuthNavigator />}
      {!isUserAuthenticated && !didTryAutoLogin && <SplashScreen />}
    </NavigationContainer>
  );
}

export default AppNavigator;
