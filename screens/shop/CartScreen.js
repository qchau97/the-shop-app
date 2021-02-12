import React from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import { Colors } from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const cartItemsArray = [];
    for (const key in state.cart.items) {
      cartItemsArray.push({
        itemId: key,
        quantity: state.cart.items[key].quantity,
        itemPrice: state.cart.items[key].productPrice,
        itemTitle: state.cart.items[key].productTitle,
        sum: state.cart.items[key].sum
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
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text></Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0}
          onPress={() => dispatch(addOrder(cartItems, totalAmount))}
        />
      </View>
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
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
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

