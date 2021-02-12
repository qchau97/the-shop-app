import React from 'react';
import { FlatList, Platform, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Colors } from '../../constants/Colors';

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(state => state.products.userProducts);

  const renderUserProductItem = (itemData) => {
    return (
      <ProductItem
        id={itemData.item.id}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          navigation.navigate('ProductDetail', {
            productId: itemData.item.id,
            productTitle: itemData.item.title,
          })
        }}
      >
        <Button
          color={Colors.primary}
          title='Edit'
          onPress={() => { }}
        />
        <Button
          color={Colors.primary}
          title='Delete'
          onPress={() => { }}
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
  }
};

const styles = StyleSheet.create({});

export default UserProductsScreen;

