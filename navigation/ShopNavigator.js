import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Platform, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants/Colors';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import { logoutUser } from '../store/actions/auth';


const defaultNavOptions = {
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
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator
      screenOptions={defaultNavOptions} // the shared config for all child screens
    >
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  )
}

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'cart-outline' : 'cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  <OrdersStackNavigator.Navigator
    screenOptions={defaultNavOptions}
  >
    <OrdersStackNavigator.Screen
      name='Orders'
      component={OrdersScreen}
      options={ordersScreenOptions}
    />
  </OrdersStackNavigator.Navigator>
}

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'list-outline' : 'list'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  )
}
// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'create-outline' : 'create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button title='Logout' color={Colors.primary} onPress={() => {
                dispatch(logoutUser());
                // props.navigation.navigate('Auth');
              }} />
            </SafeAreaView>
          </View>
        )
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'cart-outline' : 'cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'list-outline' : 'list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'create-outline' : 'create'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerItems {...props} />
//             <Button title='Logout' color={Colors.primary} onPress={() => {
//               dispatch(logoutUser());
//               // props.navigation.navigate('Auth');
//             }} />
//           </SafeAreaView>
//         </View>
//       )
//     }
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={defaultNavOptions}
    >
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  )
}

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: SplashScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// })

// export default createAppContainer(MainNavigator);
