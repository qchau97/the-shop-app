import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Loading from '../../components/UI/Loading';
import { Colors } from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);

  const handleViewDetail = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  // useEffect() NOT allow us to return a Promise
  // Thus, 'async' is NOT allowed within useEffect()
  // SOLUTION: We create a dummy wrapper function instead, and then call that function in useEffect()
  const loadProducts = useCallback(async () => {
    setError();
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  // With React Navigation DRAWER: After being created the first time we run our app, different screens are all kept in memory instead of being re-created after we navigate between screens.
  // SOLUTION: Set up a listener to navigation events
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('willFocus', loadProducts);
    // Clean up function: runs whenever this effect is about to re-run or when the component is unmounted.
    return () => {
      willFocusSubscription.remove();
    }
  }, [loadProducts]);

  // We still need this useEffect to initially fetch our data. 
  // The useEffect above (for navigation) only fires after this component is already created.
  // Thus, using it alone won't let us fetch data the first time we run our app.
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
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
  };

  if (isLoading) return <Loading />;

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  };

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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
