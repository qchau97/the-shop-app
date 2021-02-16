import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../components/UI/Loading';
import { authenticateUser } from '../store/actions/auth';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.navigate('Auth');
        return;
      }
      const transformedUserData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedUserData;
      if (new Date(expirationDate) <= new Date() || !token || !userId) {
        navigation.navigate('Auth');
        return;
      }
      navigation.navigate('Shop');
      dispatch(authenticateUser(token, userId));
    }
    getData();
  }, [])
  return <Loading />;
};

export default SplashScreen;
