import React, { useEffect, useRef } from 'react';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import ShopNavigator from './ShopNavigator';

const NavigationContainer = props => {
  const navigationRef = useRef();
  const isUserAuthenticated = useSelector(state => !!state.auth.token);
  useEffect(() => {
    // If user is not authenticated, navigate to the 'AuthScreen'
    // PROBLEM: Only components that are rendered with the help of navigator will have access to 'props.navigation.navigate'
    // SOLUTION: Use a ref to get access to navigation functionality of 'ShopNavigator' component
    // useRef() is a way to directly access an element rendered in JSX
    if (!isUserAuthenticated) {
      navigationRef.current.dispatch(NavigationActions.navigate({
        routeName: 'Auth'
      }));
    }
  }, [isUserAuthenticated])
  return <ShopNavigator ref={navigationRef} />;
}

export default NavigationContainer;
