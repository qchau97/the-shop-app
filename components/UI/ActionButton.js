import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const ActionButton = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title='Try Again'
        color={Colors.primary}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 15,
  },
});

export default ActionButton;
