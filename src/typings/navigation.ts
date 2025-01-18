import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamsList = {
  Dashboard: NavigatorScreenParams<BottomTabParamsList>;
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  CourseList: {type: string};
};

export type AppScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type BottomTabParamsList = {
  Explore: undefined;
  Search: undefined;
  Learn: undefined;
};

export type BottomTabScreensProps<T extends keyof BottomTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamsList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;
