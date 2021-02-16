import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CenteredView from '../../components/UI/CenteredView';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Loading from '../../components/UI/Loading';
import Notification from '../../components/UI/Notification';
import { Colors } from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const userProducts = useSelector(state => state.products.userProducts);

  const handleEditUserProduct = (id) => {
    navigation.navigate('EditProduct', {
      productId: id,
    });
  };

  const deleteUserProduct = async (id) => {
    setError();
    setIsLoading(true);
    try {
      await dispatch(deleteProduct(id));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{
        text: 'Dismiss'
      }]);
    }
  }, [error]);

  const handleDeleteUserProduct = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => deleteUserProduct(id),
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

  if (isLoading) return <Loading />;

  if (userProducts.length === 0) {
    return (
      <CenteredView>
        <Notification message='No products found. Maybe start adding some!' />
      </CenteredView>
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
  };
};

export default UserProductsScreen;
