import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamsList = {
  Dashboard: NavigatorScreenParams<BottomTabParamsList>;
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  CourseList: { type: string };
  CourseDetail: { courseId: string };
  EditProfile: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type BottomTabParamsList = {
  Explore: undefined;
  Search: undefined;
  Learn: NavigatorScreenParams<TopTabParamsList>;
  Settings: undefined;
};

export type BottomTabScreensProps<T extends keyof BottomTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamsList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;

export type TopTabParamsList = {
  Inprogress: undefined;
  Downloaded: undefined;
  Favorite: undefined;
};

export type CreateCourseStackParamsList = {
  CourseOverview: undefined;
  CourseCurriculum: undefined;
  CoursePreview: undefined;
};

export type InstructorStackParamsList = {
  AddNewCourse: NavigatorScreenParams<CreateCourseStackParamsList>;
};

export type CreateNewCourseStackScreenProps<
  T extends keyof CreateCourseStackParamsList,
> = CompositeScreenProps<
  NativeStackScreenProps<CreateCourseStackParamsList, T>,
  NativeStackScreenProps<InstructorStackParamsList>
>;
