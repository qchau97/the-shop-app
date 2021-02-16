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
      // SplashScreen fires whenever user starts app
      // We don't know how long the token will expire
      // Thus, we have to calculate the remaining time until the expirationDate
      const expirationTime = new Date(expirationDate).getTime() - new Date().getTime();
      navigation.navigate('Shop');
      dispatch(authenticateUser(token, userId, expirationTime));
    }
    getData();
  }, [])
  return <Loading />;
};

export default SplashScreen;
