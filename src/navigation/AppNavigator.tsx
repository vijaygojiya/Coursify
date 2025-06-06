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
import {useAuth, useCurrentUser} from '@/hooks';
import TabNavigator from './TabNavigator';
import {lightTheme} from '@/styles';
import {
  AppStackParamsList,
  InstructorStackParamsList,
} from '@/typings/navigation';
import {AppRoutes} from '.';
import BootSplash from 'react-native-bootsplash';
import {FullScreenLoader} from '@/components';
import CreateCourseNavigator from './CreateCourseNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator<
  AppStackParamsList & InstructorStackParamsList
>();

const appScreenOption: NativeStackNavigationOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  const {isLoggedIn} = useAuth();
  const {data, isLoading} = useCurrentUser({enabled: isLoggedIn});

  const isStudent = data?.role === 'student';

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
      theme={lightTheme}>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={appScreenOption}>
          {isLoggedIn ? (
            isStudent ? (
              <>
                <Stack.Screen
                  name={AppRoutes.Dashboard}
                  component={TabNavigator}
                />
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
                  component={CreateCourseNavigator}
                  name={AppRoutes.AddNewCourse}
                  options={{headerShown: true, title: 'Create New Course'}}
                />
              </>
            )
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
      </BottomSheetModalProvider>
      <FullScreenLoader loading={isLoading} />
    </NavigationContainer>
  );
};

export default AppNavigator;
