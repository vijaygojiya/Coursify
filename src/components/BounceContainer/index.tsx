import {PressableProps} from 'react-native';
import React from 'react';
import {
  withSpring,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import {AnimatedPressable} from '../AppButton';

const BounceContainer = ({
  children,
  style,
  onPressIn,
  onPressOut,
  ...rest
}: PressableProps) => {
  const animValue = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: interpolate(animValue.value, [0, 1], [1, 0.96])}],
      opacity: interpolate(animValue.value, [0, 1], [1, 0.74]),
    };
  });
  return (
    <AnimatedPressable
      style={[animStyle, style]}
      onPressIn={event => {
        animValue.value = withSpring(1);
        onPressIn?.(event);
      }}
      onPressOut={event => {
        animValue.value = withSpring(0);

        onPressOut?.(event);
      }}
      {...rest}>
      {children}
    </AnimatedPressable>
  );
};

export default BounceContainer;
