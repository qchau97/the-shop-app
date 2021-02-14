import React, { useCallback, useEffect, useState, useReducer } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import { createProduct, updateProduct } from '../../store/actions/products';

// Create actions
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// Create reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.payload.inputLabel]: action.payload.value
      }
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.payload.inputLabel]: action.payload.isInputValid
      }
      let updatedIsFormValid = true;
      for (const key in updatedInputValidities) {
        updatedIsFormValid = updatedIsFormValid && updatedInputValidities[key]
      }
      return {
        ...state,
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        isFormValid: updatedIsFormValid
      }
    default:
      return state;
  }
};

const EditProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const editedProductId = navigation.getParam('productId');
  const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === editedProductId));

  // const [state, dispatch] = useReducer(reducer, initialArg, init);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      // imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: editedProduct ? editedProduct.price.toString() : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      // imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  });

  // useCallback ensures that handleFormSubmit function is not re-created when component re-renders
  // Therefore avoid entering infinite loop
  const handleFormSubmit = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'OK' }
      ]);
      return;
    }
    if (!editedProduct) {
      dispatch(createProduct(
        formState.inputValues.title,
        // formState.inputValues.imageUrl,
        formState.inputValues.description,
        +formState.inputValues.price
      ));
    } else {
      dispatch(updateProduct(
        editedProductId,
        formState.inputValues.title,
        // formState.inputValues.imageUrl,
        formState.inputValues.description,
      ));
    }
    navigation.goBack();
  }, [dispatch, editedProductId, formState]);

  useEffect(() => {
    navigation.setParams({
      'submit': handleFormSubmit,
    });
  }, [handleFormSubmit]);

  const handleInputChange = (inputLabel, newInput) => {
    let isInputValid = false;
    if (newInput.trim().length > 0) {
      isInputValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      payload: {
        value: newInput,
        isInputValid: isInputValid,
        inputLabel: inputLabel,
      }
    })
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label='Title'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          error='Please enter a valid title!'
        />
        <Input
          label='Image Url'
          keyboardType='default'
          returnKeyType='next'
          error='Please enter a valid image url!'
        />
        <Input
          label='Price'
          keyboardType='decimal-pad'
          returnKeyType='next'
          error='Please enter a valid price!'
        />
        <Input
          label='Description'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          multiline
          numberOfLines={3}
          error='Please enter a valid description!'
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navigationData => {
  const productId = navigationData.navigation.getParam('productId');
  const submitFuntion = navigationData.navigation.getParam('submit');
  return {
    headerTitle: productId ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'checkmark-outline' : 'checkmark'}
          onPress={submitFuntion}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
