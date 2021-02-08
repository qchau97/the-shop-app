import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
    keyExtractor={item => item.id}
    data={products}
    renderItem={() => <Text>{itemData.item.title}</Text>}
    />
  )
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})
