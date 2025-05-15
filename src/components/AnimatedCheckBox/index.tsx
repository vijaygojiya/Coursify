import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import styles from './styles';

export interface IProps {
  isChecked?: boolean;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedCheckBox = ({isChecked, onPress}: IProps) => {
  const {colors} = useTheme();
  const scall = useSharedValue(1);
  const anim = useDerivedValue(() => {
    return withTiming(isChecked ? 1 : 0);
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scall.value}],
      backgroundColor: interpolateColor(
        anim.value,
        [0, 1],
        [colors.neutral10, colors.primaryMain],
      ),
      borderColor: interpolateColor(
        anim.value,
        [0, 1],
        [colors.neutral20, colors.primaryMain],
      ),
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      hitSlop={10}
      onPressIn={() => {
        scall.value = withSpring(0.87);
      }}
      onPressOut={() => {
        scall.value = withSpring(1);
      }}
      style={[styles.container, animStyle]}>
      <Svg width={16} height={16} fill="none">
        <Path
          fill="#fff"
          d="m7.105 11.793-.017.018-4.4-4.4L4.12 5.978l2.984 2.985L11.88 4.19l1.433 1.433-6.189 6.189-.018-.018Z"
        />
      </Svg>
    </AnimatedPressable>
  );
};

export default AnimatedCheckBox;
