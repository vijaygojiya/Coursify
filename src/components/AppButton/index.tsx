import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {FC, PropsWithChildren} from 'react';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

//
interface AppButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const AppButton: FC<AppButtonProps> = ({
  title = '',
  isLoading = false,
  disabled,
  containerStyle = {},
  titleStyle = {},
  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <Pressable
      disabled={disabled || isLoading}
      {...rest}
      style={[styles.container, containerStyle]}>
      {({pressed}) => (
        <AnimatedBackground pressed={pressed}>
          {isLoading ? (
            <ActivityIndicator size={23} color={colors.primarySurface} />
          ) : (
            <Text
              style={[
                styles.title,
                {color: colors.primarySurface},
                titleStyle,
              ]}>
              {title}
            </Text>
          )}
        </AnimatedBackground>
      )}
    </Pressable>
  );
};

export default AppButton;

const AnimatedBackground = ({
  children,
  pressed,
}: PropsWithChildren<{pressed: boolean}>) => {
  const {colors} = useTheme();
  const animValue = useDerivedValue(() => {
    return withSpring(pressed ? 1 : 0);
  });

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
    <Animated.View style={[styles.animateBgContainer, animStyle]}>
      {children}
    </Animated.View>
  );
};
