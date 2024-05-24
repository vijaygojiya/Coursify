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
    return focused ? withSpring(0, {duration: 6e4}) : 360;
  }, [focused]);
  //{rotateZ: `${sv.value}deg`},
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${sv.value}deg`}, {rotate: '-45deg'}],
    transformOrigin: ['100%', '30%', 0],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <SearchLine fill={color} />
    </Animated.View>
  );
};

export default SearchIcon;
