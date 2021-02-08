import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
  const products = useSelector(state => state.products.availableProducts);

  const renderProductItem = ({item}) => {    
    return (
      <ProductItem
        id={item.id}
        ownerId={item.ownerId}
        title={item.title}
        price={item.price}
        // onViewDetail={ }
        // onAddToCart={ }
      />
    )
  }
  return (
    <FlatList
      keyExtractor={item => item.title}
      data={products}
      renderItem={renderProductItem}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;

