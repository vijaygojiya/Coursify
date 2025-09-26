
import { BookOpenFillIcon } from '@/assets';
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

function BookIcon({color = '#001A72', focused, ...rest}: Props) {
  const sv = useDerivedValue(() => {
    return focused ? withSpring(180) : 0;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${sv.value}deg`}],
  }));

  return (
    <Animated.View style={animatedStyle} {...rest}>
      <BookOpenFillIcon fill={color} />
    </Animated.View>
  );
}
export default BookIcon;
