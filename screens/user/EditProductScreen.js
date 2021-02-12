import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EditProductScreen = () => {
  return (
    <View>
      <Text>Edit Product Screen</Text>
    </View>
  );
};

EditProductScreen.navigationOptions = navigationData => {
  const productTitle = navigationData.navigation.getParam('productTitle');
  return {
    headerTitle: productTitle,
  }
}

const styles = StyleSheet.create({});

export default EditProductScreen;