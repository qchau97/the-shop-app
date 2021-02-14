import React, { useCallback, useEffect, useState, useReducer } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
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
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => handleInputChange('title', text)}
            // 'newInput' is default argument which React Native would pass it automatically as the last argument in 'handleInputChange' function
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
        </View>
        {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
        {/* <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => handleInputChange('imageUrl', text)}
          />
        </View> */}
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.price}
            onChangeText={(text) => {
              if (!editedProduct) {
                handleInputChange('price', text)
              }
            }}
            keyboardType='decimal-pad'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => handleInputChange('description', text)}
            keyboardType='default'
            autoCapitalize='sentences'
          />
        </View>
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
