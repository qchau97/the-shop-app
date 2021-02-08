import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { Images } from '../../constants/Images';

const ProductDetailScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const products = useSelector(state => state.products.availableProducts);
  const selectedProduct = products.find(product => product.id === productId);
  console.log(selectedProduct.title)

  return (
    <ScrollView>
      <Image style={styles.image} source={Images[productId]} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title='Go to Cart' onPress={() => { }} />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>

    </ScrollView>
  )
};

ProductDetailScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
