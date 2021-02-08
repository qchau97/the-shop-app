import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Images } from '../../constants/Images';

const ProductItem = ({ id, ownerId, title, price, onViewDetail, onAddToCart }) => {
  const TouchableComponent = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.product}>
      <TouchableComponent useForeground onPress={onViewDetail}>
        <View>
          <Image style={styles.image} source={Images[id]} />
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <View style={styles.actions}>
            <Button
              color={Colors.primary}
              title='View Details'
              onPress={onViewDetail}
            />
            <Button
              color={Colors.primary}
              title='To Cart'
            // onPress={onAddToCart}
            />
          </View>
        </View> 
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
});

export default ProductItem;
