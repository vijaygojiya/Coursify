import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";

const containerWith = 70;

const CarouselIndicator = ({
  animatedX,
}: {
  animatedX: SharedValue<number>;
}) => {
  const { colors } = useTheme();
  const anim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedX.value,
            [0, 3],
            [0, containerWith],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.indicatorContainer, { backgroundColor: colors.neutral50 }]}
    >
      <Animated.View
        style={[
          styles.indicator,
          { backgroundColor: colors.primaryPressed },
          anim,
        ]}
      />
    </Animated.View>
  );
};
export default CarouselIndicator;
