import React from 'react';
import { Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);

  const renderOrderItem = (itemData) => {
    return (
      <OrderItem
      items={itemData.item.items}
      amount={itemData.item.totalAmount}
      date={itemData.item.readableDate}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={orders}
      renderItem={renderOrderItem}
    />
  );
};

OrdersScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'menu-outline' : 'menu'}
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

