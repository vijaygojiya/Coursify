import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import {
  CourseDetailScreen,
  CourseListScreen,
  EditProfileScreen,
  LoginScreen,
  OnboardingScreen,
  SignUpScreen,
} from "@/screens";
import TabNavigator from "./TabNavigator";
import { lightTheme } from "@/styles";
import {
  AppStackParamsList,
  InstructorStackParamsList,
} from "@/typings/navigation";
import { AppRoutes } from ".";
import CreateCourseNavigator from "./CreateCourseNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Splash from "expo-splash-screen";
import {
  FirebaseAuthTypes,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useCurrentUser } from "@/hooks";
import { FullScreenLoader } from "@/components";
import { fireAuth } from "@/services/firebase";

const Stack = createNativeStackNavigator<
  AppStackParamsList & InstructorStackParamsList
>();

const appScreenOption: NativeStackNavigationOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!fireAuth.currentUser?.email);
  const { data, isLoading } = useCurrentUser({ enabled: Boolean(isLoggedIn) });

  const handleAuthStateChanged = useCallback(
    function (_user: FirebaseAuthTypes.User | null) {
      setIsLoggedIn(Boolean(_user));
    },
    [setIsLoggedIn]
  );

  useEffect(() => {
    const subscriber = onAuthStateChanged(fireAuth, handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [handleAuthStateChanged]);

  const onNavigationReady = useCallback(() => {
    Splash.hideAsync();
  }, []);

  const isInstructor = useMemo(() => data?.role === "instructor", [data?.role]);

  return (
    <NavigationContainer onReady={onNavigationReady} theme={lightTheme}>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={appScreenOption}>
          {isLoggedIn ? (
            isInstructor ? (
              <Stack.Screen
                component={CreateCourseNavigator}
                name={AppRoutes.AddNewCourse}
                options={{ headerShown: true, title: "Create New Course" }}
              />
            ) : (
              <>
                <Stack.Screen
                  name={AppRoutes.Dashboard}
                  component={TabNavigator}
                />
                <Stack.Screen
                  name={AppRoutes.EditProfile}
                  component={EditProfileScreen}
                  options={{ headerShown: true, title: "Edit Profile" }}
                />
                <Stack.Screen
                  name={AppRoutes.CourseList}
                  component={CourseListScreen}
                  options={({ route }) => {
                    return {
                      headerShown: true,
                      title: route.params?.type,
                    };
                  }}
                />
                <Stack.Screen
                  name={AppRoutes.CourseDetail}
                  component={CourseDetailScreen}
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
