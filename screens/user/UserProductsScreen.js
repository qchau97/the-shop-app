import React from 'react';
import { FlatList, Platform, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Colors } from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);

  const handleEditUserProduct = (id, title) => {
    navigation.navigate('EditProduct', {
      productId: id,
      productTitle: title,
    })
  };

  const renderUserProductItem = (itemData) => {
    return (
      <ProductItem
        id={itemData.item.id}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => handleEditUserProduct(itemData.item.id, itemData.item.title)}
      >
        <Button
          color={Colors.primary}
          title='Edit'
          onPress={() => handleEditUserProduct(itemData.item.id, itemData.item.title)}
        />
        <Button
          color={Colors.primary}
          title='Delete'
          onPress={() => { dispatch(deleteProduct(itemData.item.id)) }}
        />
      </ProductItem>
    )
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={userProducts}
      renderItem={renderUserProductItem}
      onViewDetail={() => { }}
      onAddToCart={() => { }}
    />
  );
};

UserProductsScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Your Products',
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
          title='Add'
          iconName={Platform.OS === 'android' ? 'pencil-outline' : 'pencil'}
          onPress={() => navigationData.navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
    ),
  }
};

const styles = StyleSheet.create({});

export default UserProductsScreen;

