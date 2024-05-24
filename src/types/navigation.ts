import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Routes from '../router/routes';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type AppStackParamsList = {
  [Routes.Login]: undefined;
  [Routes.SignUp]: undefined;
  [Routes.OnBoarding]: undefined;
  [Routes.ForgotPassword]: undefined;
  [Routes.TabNavigator]: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  [Routes.Explore]: undefined;
  [Routes.Search]: undefined;
  [Routes.Learn]: undefined;
};

export type AppStackScreensProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type TabScreensProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;
