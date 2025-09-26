import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {ChevronIcon} from '@/assets';

const AnimatedChevron = ({isOpen = false}) => {
  const rotation = useDerivedValue(() => {
    return withTiming(isOpen ? 90 : -90);
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  return (
    <Animated.View style={animStyle}>
      <ChevronIcon height={28} width={28} strokeWidth={2} />
    </Animated.View>
  );
};

export default AnimatedChevron;
