import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CenteredView from '../../components/UI/CenteredView';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Loading from '../../components/UI/Loading';
import Notification from '../../components/UI/Notification';
import { fetchOrders } from '../../store/actions/orders';

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const orders = useSelector(state => state.orders.orders);

  const loadOrders = useCallback(async () => {
    setError();
    setIsRefreshing(true);
    try {
      await dispatch(fetchOrders());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('willFocus', loadOrders);
    return () => {
      willFocusSubscription.remove();
    }
  }, [loadOrders]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

  const renderOrderItem = (itemData) => {
    return (
      <OrderItem
        items={itemData.item.items}
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
      />
    );
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <CenteredView>
        <Notification message='An error occurred!' />
        <ActionButton onPress={loadOrders} />
      </CenteredView>
    )
  };

  if (!isLoading && orders.length === 0) {
    return (
      <CenteredView>
        <Notification message='No orders found. Maybe start ordering some products?' />
      </CenteredView>
    )
  };

  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
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

