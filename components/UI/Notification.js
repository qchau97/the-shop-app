import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Notification = ({ message }) => {
  return <Text style={styles.message}>{message}</Text>;
};

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
  },
});

export default Notification;
