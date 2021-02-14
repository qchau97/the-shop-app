import React from 'react';
import { Alert, Button, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Colors } from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);

  const handleEditUserProduct = (id) => {
    navigation.navigate('EditProduct', {
      productId: id,
    });
  };

  const handleDeleteUserProduct = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => { dispatch(deleteProduct(id)); },
        },
      ],
      {
        cancelable: true, // allow user to dismiss Alert by tapping outside
        // onDismiss: () => { }
      }
    );
  };

  const renderUserProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelect={() => handleEditUserProduct(itemData.item.id)}
      >
        <Button
          color={Colors.primary}
          title='Edit'
          onPress={() => handleEditUserProduct(itemData.item.id)}
        />
        <Button
          color={Colors.primary}
          title='Delete'
          onPress={() => handleDeleteUserProduct(itemData.item.id)}
        />
      </ProductItem>
    );
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
  };
};

export default UserProductsScreen;
