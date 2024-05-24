import {Text, View} from 'react-native';
import React from 'react';
import {TabScreensProps} from '@/types/navigation';

const Explore = ({}: TabScreensProps<'Explore'>) => {
  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
};

export default Explore;
