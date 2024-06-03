import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

//
interface AppButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AppButton: FC<AppButtonProps> = ({
  title = '',
  isLoading = false,
  disabled,
  onPressIn,
  onPressOut,
  containerStyle = {},
  titleStyle = {},

  ...rest
}) => {
  const animValue = useSharedValue(0);
  const {colors} = useTheme();

  const animStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animValue.value,
      [0, 1],
      [colors.primaryMain, colors.primaryPressed],
    );
    return {
      transform: [{scale: interpolate(animValue.value, [0, 1], [1, 0.98])}],
      backgroundColor: color,
    };
  });
  return (
    <AnimatedPressable
      disabled={disabled || isLoading}
      onPressIn={data => {
        animValue.value = withSpring(1);
        onPressIn?.(data);
      }}
      onPressOut={data => {
        animValue.value = withSpring(0);
        onPressOut?.(data);
      }}
      {...rest}
      style={[styles.container, animStyle, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator size={23} color={colors.primarySurface} />
      ) : (
        <Text
          style={[styles.title, {color: colors.primarySurface}, titleStyle]}>
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
};

export default AppButton;
