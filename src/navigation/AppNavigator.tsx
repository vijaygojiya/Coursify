import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {LoginScreen} from '@/screens';
import {useAuth} from '@/hooks';
import TabNavigator from './TabNavigator';
import {lightTheme} from '@/styles';
import AppRoutes from './Routes';

const Stack = createNativeStackNavigator();

const appScreenOption: NativeStackNavigationOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  const {isLoggedIn} = useAuth();
  return (
    <NavigationContainer theme={lightTheme}>
      <Stack.Navigator screenOptions={appScreenOption}>
        {isLoggedIn ? (
          <Stack.Screen name={AppRoutes.Dashboard} component={TabNavigator} />
        ) : (
          <Stack.Screen name={AppRoutes.Login} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
