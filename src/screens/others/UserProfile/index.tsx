import {Text, View} from 'react-native';
import React from 'react';
import {AppStackScreensProps} from '@/types/navigation';

const UserProfile = ({}: AppStackScreensProps<'UserProfile'>) => {
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;
