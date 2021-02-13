import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const EditProductScreen = ({ navigation }) => {
  const editedProductId = navigation.getParam('productId');
  const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === editedProductId));
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.title : '');
  const [price, setPrice] = useState(editedProduct ? editedProduct.price.toString() : '');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const handlePriceChange = (newPrice) => {
    if (!editedProduct) {
      setPrice(newPrice)
    };
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        {/* <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View> */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={handlePriceChange}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navigationData => {
  const productId = navigationData.navigation.getParam('productId');
  return {
    headerTitle: productId ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'checkmark-outline' : 'checkmark'}
          onPress={() => { }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;