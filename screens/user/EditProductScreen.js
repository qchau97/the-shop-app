import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import Loading from '../../components/UI/Loading';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const editedProductId = navigation.getParam('productId');
  const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === editedProductId));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      image: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: editedProduct ? editedProduct.price.toString() : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      image: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  });

  const handleFormSubmit = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'OK' }
      ]);
      return;
    }
    setError();
    setIsLoading(true);
    try {
      if (!editedProduct) {
        await dispatch(createProduct(
          formState.inputValues.title,
          formState.inputValues.image,
          formState.inputValues.description,
          +formState.inputValues.price
        ));
      } else {
        await dispatch(updateProduct(
          editedProductId,
          formState.inputValues.title,
          formState.inputValues.image,
          formState.inputValues.description,
        ));
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, editedProductId, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{
        text: 'Dismiss'
      }]);
    }
  }, [error])

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

  if (isLoading) return <Loading />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            required
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            isInitiallyValid={!!editedProduct}
            label='Image'
            keyboardType='default'
            returnKeyType='next'
            error='Please enter a valid image URL!'
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
