import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import styles from "./styles";
import { screenWidth } from "@/utils/constant";

interface DotIndicatorProps {
  animatedX: SharedValue<number>;
  index: number;
}

const DotIndicator = ({ index, animatedX }: DotIndicatorProps) => {
  const { colors } = useTheme();
  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedX.value / screenWidth,
      [index - 1, index, index + 1],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP,
    );
    const color = interpolateColor(
      animatedX.value / screenWidth,
      [index - 1, index, index + 1],
      [colors.primaryPressed, colors.primaryMain, colors.primaryPressed],
    );
    return {
      transform: [{ scale }],
      backgroundColor: color,
    };
  });
  return <Animated.View key={index} style={[styles.dot, animStyle]} />;
};

export default DotIndicator;
