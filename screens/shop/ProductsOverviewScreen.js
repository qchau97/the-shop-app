import React from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { addToCart } from '../../store/actions/cart';

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        id={itemData.item.id}
        ownerId={itemData.item.ownerId}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => {
          navigation.navigate('ProductDetail', {
            productId: itemData.item.id,
            productTitle: itemData.item.title,
          })
        }}
        onAddToCart={() => dispatch(addToCart(itemData.item))}
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

ProductsOverviewScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart' // If there are many icons, each title must be unique as a key
          iconName={Platform.OS === 'android' ? 'cart-outline' : 'cart'}
          onPress={() => {
            navigationData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  }
};

export default ProductsOverviewScreen;

