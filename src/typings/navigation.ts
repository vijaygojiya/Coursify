import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamsList = {
  Dashboard: NavigatorScreenParams<BottomTabParamsList>;
  Login: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type BottomTabParamsList = {
  Home: undefined;
};

export type BottomTabScreensProps<T extends keyof BottomTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamsList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;
