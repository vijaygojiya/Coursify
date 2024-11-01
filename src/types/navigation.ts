import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type AppStackParamsList = {
  Login: undefined;
  SignUp: undefined;
  OnBoarding: undefined;
  ForgotPassword: undefined;
  TabNavigator: NavigatorScreenParams<TabParamList>;
  CourseDetail: {url: string};
  UserProfile: undefined;
  Setting: undefined;
};

export type TabParamList = {
  Explore: undefined;
  Search: undefined;
  Learn: undefined;
};

export type AppStackScreensProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type TabScreensProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;
