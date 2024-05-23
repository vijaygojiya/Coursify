import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Routes from '../router/routes';

export type AppStackParamsList = {
  [Routes.Login]: undefined;
  [Routes.SignUp]: undefined;
  [Routes.OnBoarding]: undefined;
};

export type AppStackScreensProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;
