import {Text, View} from 'react-native';
import React from 'react';
import {AppStackScreensProps} from '@/types/navigation';

const Login = ({}: AppStackScreensProps<'Login'>) => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
