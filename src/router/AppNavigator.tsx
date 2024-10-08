import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {AppStackParamsList} from '@/types/navigation';
import Routes from './routes';
import {
  ForgotPasswordScreen,
  LoginScreen,
  OnBoardingScreen,
  SignUpScreen,
} from '@/screens';
import colors from '@/styles/colors';
import {StatusBar, View} from 'react-native';
import TabNavigator from './TabNavigator';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {useAuth} from '@/hooks';
import BootSplash from 'react-native-bootsplash';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

//@ts-ignore
//TO:DO resolve type error on navigation version 7
//solution:https://github.com/react-navigation/react-navigation/issues/9161#issuecomment-2014957063

const appTheme = {
  colors: {...DefaultTheme.colors, ...colors},
  dark: false,
} as Theme;
const AppNavigator = () => {
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(colors.neutral10);
  }, []);

  return (
    <NavigationContainer
      theme={appTheme}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <StatusBar
        //@ts-ignore
        backgroundColor={appTheme.colors.primaryMain}
        barStyle={'light-content'}
      />
      <AppStack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_left'}}
        initialRouteName={isLoggedIn ? Routes.TabNavigator : Routes.OnBoarding}>
        {isLoggedIn ? (
          <AppStack.Screen
            name={Routes.TabNavigator}
            component={TabNavigator}
            options={{animation: 'fade'}}
          />
        ) : (
          <>
            <AppStack.Screen
              name={Routes.OnBoarding}
              component={OnBoardingScreen}
            />
            <AppStack.Screen name={Routes.Login} component={LoginScreen} />
            <AppStack.Screen name={Routes.SignUp} component={SignUpScreen} />
            <AppStack.Screen
              name={Routes.ForgotPassword}
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
