import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {AppStackParamsList} from '@/types/navigation';
import Routes from './routes';
import {LoginScreen, OnBoardingScreen, SignUpScreen} from '@/screens';
import colors from '@/styles/colors';
import {StatusBar} from 'react-native';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

//@ts-ignore
//TO:DO resolve type error on navigation version 7
//solution:https://github.com/react-navigation/react-navigation/issues/9161#issuecomment-2014957063

const appTheme = {colors: colors, dark: false} as Theme;
const AppNavigator = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer theme={appTheme}>
      <StatusBar
        //@ts-ignore
        backgroundColor={appTheme.colors.neutral10}
        barStyle={'dark-content'}
      />
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isLoggedIn ? Routes.Login : Routes.OnBoarding}>
        <AppStack.Screen
          name={Routes.OnBoarding}
          component={OnBoardingScreen}
        />
        <AppStack.Screen name={Routes.Login} component={LoginScreen} />
        <AppStack.Screen name={Routes.SignUp} component={SignUpScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
