import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Colors } from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector(state => state.products.availableProducts);

  const handleViewDetail = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  // Since 'async' is not allowed within useEffect (useEffect doesn't allow us to return a Promise), we have to create a dummy wrapper function instead.
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    console.log(error.message);
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelect={() => handleViewDetail(itemData.item.id, itemData.item.title)}
      >
        <Button
          color={Colors.primary}
          title='View Details'
          onPress={() => handleViewDetail(itemData.item.id, itemData.item.title)}
        />
        <Button
          color={Colors.primary}
          title='To Cart'
          onPress={() => dispatch(addToCart(itemData.item))}
        />
      </ProductItem>
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
            onPress={loadProducts}
          />
        </View>
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
      </View>
    )
  };
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  };
  return (
    <FlatList
      keyExtractor={item => item.title}
      data={products}
      renderItem={renderProductItem}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'menu-outline' : 'menu'}
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'cart-outline' : 'cart'}
          onPress={() => {
            navigationData.navigation.navigate('Cart');
          }}
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

export default ProductsOverviewScreen;
