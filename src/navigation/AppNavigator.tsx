import React, { useMemo } from "react";
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
import CreateCourseNavigator from "./CreateCourseNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAuth } from "@/contexts/AuthContext";
import { AppRoutes } from ".";

const Stack = createNativeStackNavigator<
  AppStackParamsList & InstructorStackParamsList
>();

const appScreenOption: NativeStackNavigationOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  const { session } = useAuth();

  const isInstructor = useMemo(
    () => session?.user.user_metadata?.role === "instructor",
    [session?.user.user_metadata?.role],
  );

  return (
    <NavigationContainer theme={lightTheme}>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={appScreenOption}>
          {session ? (
            isInstructor ? (
              <Stack.Screen
                getComponent={() => CreateCourseNavigator}
                name={AppRoutes.AddNewCourse}
                options={{ headerShown: true, title: "Create New Course" }}
              />
            ) : (
              <>
                <Stack.Screen
                  name={AppRoutes.Dashboard}
                  getComponent={() => TabNavigator}
                />
                <Stack.Screen
                  name={AppRoutes.EditProfile}
                  getComponent={() => EditProfileScreen}
                  options={{ headerShown: true, title: "Edit Profile" }}
                />
                <Stack.Screen
                  name={AppRoutes.CourseList}
                  getComponent={() => CourseListScreen}
                  options={({ route }) => {
                    return {
                      headerShown: true,
                      title: route.params?.type,
                    };
                  }}
                />
                <Stack.Screen
                  name={AppRoutes.CourseDetail}
                  getComponent={() => CourseDetailScreen}
                />
              </>
            )
          ) : (
            <>
              <Stack.Screen
                name={AppRoutes.Onboarding}
                getComponent={() => OnboardingScreen}
              />
              <Stack.Screen
                name={AppRoutes.Login}
                getComponent={() => LoginScreen}
              />
              <Stack.Screen
                name={AppRoutes.SignUp}
                getComponent={() => SignUpScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </BottomSheetModalProvider>
      {/* <FullScreenLoader loading={isLoading} /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
