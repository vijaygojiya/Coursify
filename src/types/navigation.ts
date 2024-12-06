import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type AppStackParamsList = {
  Loading: undefined;
  Login: undefined;
  SignUp: undefined;
  OnBoarding: undefined;
  ForgotPassword: undefined;
  TabNavigator: NavigatorScreenParams<TabParamList>;
  CourseDetail: {url: string};
  CourseList: {type: string};
  UserProfile: undefined;
  Setting: undefined;
  EditProfile: undefined;
};
export type TopTabParamsList = {
  Inprogress: undefined;
  Downloaded: undefined;
  Favorite: undefined;
};

export type TabParamList = {
  Explore: undefined;
  Search: undefined;
  Learn: NavigatorScreenParams<TopTabParamsList>;
};

export type AppStackScreensProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type TabScreensProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;
