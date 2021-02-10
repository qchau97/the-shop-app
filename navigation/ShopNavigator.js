import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Colors } from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
      fontFamily: 'OpenSans-Bold',
    },
    headerBackTitle: {
      fontFamily: 'OpenSans-Regular',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,
  }
});

export default createAppContainer(ProductsNavigator);