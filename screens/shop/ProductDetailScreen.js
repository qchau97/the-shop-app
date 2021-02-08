import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = ({navigation}) => {
  const productId = navigation.getParam('productId');
  const products = useSelector(state => state.products.availableProducts);
  const selectedProduct = products.find(product => product.id === productId);
  console.log(selectedProduct.title)

  return (
    <View>
      <Text style={styles.title}>{selectedProduct.title}</Text>
    </View>
  )
};

ProductDetailScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  title: {
    color: 'red'
  }
});

export default ProductDetailScreen;
