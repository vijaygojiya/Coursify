import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {LoginScreen, SignUpScreen} from '../screens';
import {AppStackParamsList} from '../types/navigation';
import OnBoarding from '../screens/auth/onBoarding';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const AppNavigator = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isLoggedIn ? Routes.Login : Routes.OnBoarding}>
        <AppStack.Screen name={Routes.OnBoarding} component={OnBoarding} />
        <AppStack.Screen name={Routes.Login} component={LoginScreen} />
        <AppStack.Screen name={Routes.SignUp} component={SignUpScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
