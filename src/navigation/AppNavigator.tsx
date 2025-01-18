import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  CourseListScreen,
  EditProfileScreen,
  LoginScreen,
  OnboardingScreen,
  SignUpScreen,
} from '@/screens';
import {useAuth} from '@/hooks';
import TabNavigator from './TabNavigator';
import {lightTheme} from '@/styles';
import {AppStackParamsList} from '@/typings/navigation';
import {AppRoutes} from '.';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const appScreenOption: NativeStackNavigationOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  const {isLoggedIn} = useAuth();
  return (
    <NavigationContainer theme={lightTheme}>
      <Stack.Navigator screenOptions={appScreenOption}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name={AppRoutes.Dashboard} component={TabNavigator} />
            <Stack.Screen
              name={AppRoutes.EditProfile}
              component={EditProfileScreen}
              options={{headerShown: true, title: 'Edit Profile'}}
            />

            <Stack.Screen
              name={AppRoutes.CourseList}
              component={CourseListScreen}
              options={({route}) => {
                return {
                  headerShown: true,
                  title: route.params?.type,
                };
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={AppRoutes.Onboarding}
              component={OnboardingScreen}
            />
            <Stack.Screen name={AppRoutes.Login} component={LoginScreen} />
            <Stack.Screen name={AppRoutes.SignUp} component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
