import React from 'react';
import { StyleSheet, View } from 'react-native';

const CenteredView = props => {
  return (
    <View style={styles.centered}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenteredView;

