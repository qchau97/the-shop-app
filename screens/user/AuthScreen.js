import React from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import { Colors } from '../../constants/Colors';

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <LinearGradient
      // colors={['#ffedff', '#ffe3ff']}
      colors={['#fff', '#C2185B']}
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
              onInputChange={() => { }}
            />
            <Input
              required
              initialValue=''
              // isInitiallyValid={false}
              // id='email'
              label='Password'
              keyboardType='default'
              secureTextEntry
              minLength={5}
              autoCapitalize='none'
              error='Please enter a valid password!'
              onInputChange={() => { }}
            />
            <View style={styles.buttonContainer}>
              <Button
                title='Login'
                color={Colors.primary}
                onPress={() => { }} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title='Switch to Sign Up'
                color={Colors.accent}
                onPress={() => { }} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
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
