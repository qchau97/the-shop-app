import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { addToCart } from '../../store/actions/cart';
import { Colors } from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  const handleViewDetail = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  };

  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        id={itemData.item.id}
        ownerId={itemData.item.ownerId}
        title={itemData.item.title}
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
  }
};

export default ProductsOverviewScreen;