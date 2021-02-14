import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Card from '../UI/Card';

const ProductItem = ({ children, title, imageUrl, price, onSelect }) => {
  const TouchableComponent = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Card style={styles.product}>
      <TouchableComponent useForeground onPress={onSelect}>
        <View>
          <Image style={styles.image} source={{uri: imageUrl}} />
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            {children}
          </View>
        </View>
      </TouchableComponent>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
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
