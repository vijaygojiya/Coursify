import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CourseDetailScreen,
  CourseListScreen,
  EditProfileScreen,
  ForgotPasswordScreen,
  LoginScreen,
  OnBoardingScreen,
  SettingScreen,
  SignUpScreen,
  UserProfileScreen,
} from '@/screens';
import {useAuth} from '@/hooks';
import TabNavigator from './TabNavigator';
import BootSplash from 'react-native-bootsplash';
import {DefaultTheme, Theme} from '@react-navigation/native';
import colors from '@/styles/colors';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import styles from './styles';
SystemNavigationBar.setNavigationColor(colors.neutral10);

const appTheme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, ...colors, background: colors.neutral10},
  dark: false,
} as Theme;

const useIsSignedIn = () => {
  const {isLoggedIn} = useAuth();
  return isLoggedIn;
};

const useIsSignedOut = () => {
  const {isLoggedIn} = useAuth();
  return !isLoggedIn;
};

const AppStack = createNativeStackNavigator({
  screenOptions: () => {
    return {
      headerShown: false,
      headerShadowVisible: false,
      headerTitleStyle: [styles.appBarTitle, {color: colors.neutral90}],
      headerBackTitle: 'Back',
    };
  },
  screens: {
    Dashboard: TabNavigator,
    CourseDetail: CourseDetailScreen,
    UserProfile: {
      screen: UserProfileScreen,
      options: {title: 'Profile', headerShown: true},
    },
    Setting: {
      screen: SettingScreen,
      options: {
        title: 'Settings',
        headerShown: true,
      },
    },
    CourseList: {
      screen: CourseListScreen,
      options: {headerShown: true},
    },
    EditProfile: {
      screen: EditProfileScreen,
      options: {title: 'Edit Profile', headerShown: true},
    },
  },
});

const AuthStack = createNativeStackNavigator({
  screenOptions: {headerShown: false},
  screens: {
    OnBoarding: OnBoardingScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {headerShown: false},
  screens: {
    AuthFlow: {
      screen: AuthStack,
      if: useIsSignedOut,
    },
    AppFlow: {
      screen: AppStack,
      if: useIsSignedIn,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const AppStackNavigation = () => {
  return (
    <Navigation
      theme={appTheme}
      onReady={() => {
        BootSplash.hide();
      }}
    />
  );
};
export default AppStackNavigation;
