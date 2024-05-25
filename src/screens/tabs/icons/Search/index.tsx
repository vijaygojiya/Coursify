import React from 'react';
import {SearchLine} from '@/assets';

import Animated, {
  useDerivedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  focused: boolean;
  color?: string;
}

const SearchIcon = ({color = '#001A72', focused}: Props) => {
  const sv = useDerivedValue(() => {
    return focused ? withSpring(360) : 0;
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: '-45deg'}, {rotateY: `${sv.value}deg`}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <SearchLine fill={color} />
    </Animated.View>
  );
};

export default SearchIcon;
