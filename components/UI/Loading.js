import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import CenteredView from './CenteredView';

const Loading = () => {
  return (
    <CenteredView>
      <ActivityIndicator
        size='large'
        color={Colors.primary}
      />
    </CenteredView>
  );
};

export default Loading;