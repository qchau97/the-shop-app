import React, { useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.payload.value,
        isInputValid: action.payload.isInputValid
      }
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      }
    default:
      return state;
  }
};

const Input = props => {
  const { onInputChange, label } = props;
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isInputValid: props.isInitiallyValid,
    touched: false,
  });

  const handleInputChange = (newInput) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && newInput.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(newInput.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +newInput < props.min) {
      isValid = false;
    }
    if (props.max != null && +newInput > props.max) {
      isValid = false;
    }
    if (props.minLength != null && newInput.length < props.minLength) {
      isValid = false;
    }
    dispatchInputState({
      type: INPUT_CHANGE,
      payload: {
        value: newInput,
        isInputValid: isValid
      }
    })
  };

  const handleInputBlur = () => {
    dispatchInputState({
      type: INPUT_BLUR,
    });
  };

  useEffect(() => {
    // if (inputState.touched) {
    //   onInputChange(label, inputState.value, inputState.isInputValid);
    // }
    onInputChange(label, inputState.value, inputState.isInputValid);
  }, [label, inputState, onInputChange]);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={(newInput) => handleInputChange(newInput)}
        onBlur={handleInputBlur}
      />
      {!inputState.isInputValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    fontFamily: 'OpenSans-Regular',
    color: '#f00',
    fontSize: 13,
  },
});

export default Input;

