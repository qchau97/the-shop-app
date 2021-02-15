import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import { Colors } from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const cartItemsArray = [];
    for (const key in state.cart.items) {
      cartItemsArray.push({
        itemId: key,
        quantity: state.cart.items[key].quantity,
        itemPrice: state.cart.items[key].productPrice,
        itemTitle: state.cart.items[key].productTitle,
        sum: state.cart.items[key].sum,
      });
    }
    return cartItemsArray.sort((a, b) => a.itemId > b.itemId ? 1 : -1);
  });

  const renderCartItem = (itemData) => {
    return (
      <CartItem
        deletable
        quantity={itemData.item.quantity}
        title={itemData.item.itemTitle}
        amount={itemData.item.sum}
        onRemove={() => dispatch(removeFromCart(itemData.item.itemId))}
      />
    );
  };

  const handleOrderSubmit = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text></Text>
        {isLoading ? <ActivityIndicator size='large' color={Colors.primary} /> : <Button
            color={Colors.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
            onPress={handleOrderSubmit}
          />}
      </Card>
      <FlatList
        keyExtractor={item => item.itemId}
        data={cartItems}
        renderItem={renderCartItem}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;

