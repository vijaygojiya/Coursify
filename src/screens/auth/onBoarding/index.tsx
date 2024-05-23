import {Text, View} from 'react-native';
import React from 'react';
import {AppStackScreensProps} from '../../../types/navigation';

const OnBoarding = ({}: AppStackScreensProps<'OnBoarding'>) => {
  return (
    <View>
      <Text>OnBoarding</Text>
    </View>
  );
};

export default OnBoarding;
