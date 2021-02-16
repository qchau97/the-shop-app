import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Loading from '../../components/UI/Loading';
import { Colors } from '../../constants/Colors';
import { signinAccount, signupAccount } from '../../store/actions/auth';

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

const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

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

  const handleAuth = async () => {
    let action;
    if (isSignup) {
      action = signupAccount(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = signinAccount(formState.inputValues.email, formState.inputValues.password);
    }
    setError();
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate('Shop');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{
        text: 'Dismiss'
      }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={['#ffe3ff', '#ffe3aa']}
          style={styles.gradient}
        >
          <Card style={styles.authContainer}>
            <ScrollView>
              <Input
                required
                email
                initialValue=''
                // isInitiallyValid={false}
                // id='email'
                label='Email'
                keyboardType='email-address'
                autoCapitalize='none'
                error='Please enter a valid email address!'
                onInputChange={handleInputChange}
              />
              <Input
                required
                initialValue=''
                // isInitiallyValid={false}
                // id='email'
                label='Password'
                keyboardType='default'
                secureTextEntry
                minLength={6}
                autoCapitalize='none'
                error='Please enter a valid password!'
                onInputChange={handleInputChange}
              />
              <View style={styles.buttonContainer}>
                {isLoading ? <Loading /> : <Button
                  title={isSignup ? 'Signup' : 'Login'}
                  color={Colors.primary}
                  onPress={handleAuth} />}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignup ? 'Login' : 'Signup'}`}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignup(prevState => !prevState)
                  }} />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
