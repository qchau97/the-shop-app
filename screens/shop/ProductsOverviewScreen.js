import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, View } from 'react-native';
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
  const products = useSelector(state => state.products.availableProducts);

  const handleViewDetail = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  // Since 'async' is not allowed within useEffect (useEffect doesn't allow us to return a Promise), we have to create a dummy wrapper function instead.
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

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
  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
      </View>
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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProductsOverviewScreen;
