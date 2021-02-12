import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={orders}
      renderItem={({ item }) => <Text>{item.totalAmount}</Text>}
    />
  )
};

OrdersScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu' // If there are many icons, each title must be unique as a key
          iconName={Platform.OS === 'android' ? 'menu-outline' : 'menu'}
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({});

export default OrdersScreen;

