import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import {fonts} from '@/styles';
import {AppStackParamsList} from '@/types/navigation';
import Routes from './routes';

SystemNavigationBar.setNavigationColor(colors.neutral10);

const appTheme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, ...colors, background: colors.neutral10},
  fonts: {
    regular: {fontFamily: fonts.regular, fontWeight: '400'},
    medium: {fontFamily: fonts.medium, fontWeight: '500'},
    bold: {fontFamily: fonts.semiBold, fontWeight: '600'},
    heavy: {fontFamily: fonts.bold, fontWeight: '700'},
  },
  dark: false,
} as Theme;

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const AppStackNavigation = () => {
  const {isLoggedIn} = useAuth();
  return (
    <NavigationContainer
      theme={appTheme}
      onReady={() => {
        BootSplash.hide();
      }}>
      <AppStack.Navigator
        screenOptions={{
          headerTintColor: colors.primaryMain,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: [{color: colors.neutral90}],
          headerBackTitle: 'Back',
        }}>
        {!isLoggedIn ? (
          <AppStack.Group screenOptions={{headerShown: false}}>
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
          </AppStack.Group>
        ) : (
          <>
            <AppStack.Screen
              name={Routes.TabNavigator}
              component={TabNavigator}
              options={{headerShown: false}}
            />
            <AppStack.Screen
              name={Routes.CourseDetail}
              component={CourseDetailScreen}
              options={{headerShown: false}}
            />
            <AppStack.Screen
              name={Routes.UserProfile}
              component={UserProfileScreen}
              options={{title: 'Profile'}}
            />
            <AppStack.Screen
              name={Routes.Setting}
              component={SettingScreen}
              options={{title: 'Settings'}}
            />
            <AppStack.Screen
              name={Routes.CourseList}
              component={CourseListScreen}
              options={({route}) => {
                return {
                  title: route.params?.type,
                };
              }}
            />
            <AppStack.Screen
              name={Routes.EditProfile}
              component={EditProfileScreen}
              options={{title: 'Edit Profile'}}
            />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
export default AppStackNavigation;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamsList {}
  }
}
