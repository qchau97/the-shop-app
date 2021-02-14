import React, { useCallback, useEffect, useReducer } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import { createProduct, updateProduct } from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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
        updatedIsFormValid = updatedIsFormValid && updatedInputValidities[key];
      }
      return {
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

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      description: editedProduct ? editedProduct.description : '',
      price: editedProduct ? editedProduct.price.toString() : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  });

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
        formState.inputValues.description,
        +formState.inputValues.price
      ));
    } else {
      dispatch(updateProduct(
        editedProductId,
        formState.inputValues.title,
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

  const handleInputChange = useCallback((inputLabel, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      payload: {
        value: inputValue,
        isInputValid: inputValidity,
        inputLabel: inputLabel.toLowerCase(),
      }
    });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            required
            initialValue={editedProduct ? editedProduct.title : ''}
            isInitiallyValid={!!editedProduct}
            label='Title'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            error='Please enter a valid title!'
            onInputChange={handleInputChange}
          />
          <Input
            editable={!editedProduct}
            required
            min={0.1}
            initialValue={editedProduct ? editedProduct.price.toString() : ''}
            isInitiallyValid={!!editedProduct}
            label='Price'
            keyboardType='decimal-pad'
            returnKeyType='next'
            error='Please enter a valid price!'
            onInputChange={handleInputChange}
          />
          <Input
            required
            minLength={5}
            initialValue={editedProduct ? editedProduct.description : ''}
            isInitiallyValid={!!editedProduct}
            label='Description'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            error='Please enter a valid description!'
            onInputChange={handleInputChange}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
