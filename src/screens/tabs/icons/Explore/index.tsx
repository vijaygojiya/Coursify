import {CompassFill} from '@/assets';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  focused: boolean;
  color?: string;
}
function ExploreIcon({color, focused, ...rest}: Props) {
  const sv = useDerivedValue(() => {
    return focused ? withSpring(360) : 0;
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${sv.value}deg`}],
  }));

  return (
    <Animated.View style={animatedStyle} {...rest}>
      <CompassFill fill={color} />
    </Animated.View>
  );
}

export default ExploreIcon;
