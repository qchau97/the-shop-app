import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Loading from '../../components/UI/Loading';
import { Colors } from '../../constants/Colors';
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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Try Again'
            color={Colors.primary}
            onPress={loadOrders}
          />
        </View>
      </View>
    )
  };

  if (isLoading) return <Loading />;

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found. Maybe start adding some!</Text>
      </View>
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 15,
  },
});

export default OrdersScreen;

