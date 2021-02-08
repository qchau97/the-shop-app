import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
const Stack = createStackNavigator();
import { Colors } from '../constants/Colors';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products Overview"
          component={ProductsOverviewScreen}
          options={{ title: 'Overview' }}
        />
        <Stack.Screen
          name="Products Details"
          component={ProductDetailScreen}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;

// The 'component' prop accepts component, not a render function. 
// Don't pass an inline function (e.g. component={() => <HomeScreen />}), or your component will unmount and remount losing all state when the parent component re-renders.

// Each screen in the navigator can specify some options for the navigator, such as the title to render in the header. 
// These options can be passed in the 'options' prop for each screen component.

// Sometimes we will want to specify the same options for all of the screens in the navigator. 
// For that, we can pass a 'screenOptions' prop to the navigator.