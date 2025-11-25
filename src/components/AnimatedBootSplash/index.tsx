import React from "react";
import BootSplash from "react-native-bootsplash";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type Props = {
  onAnimationEnd: () => void;
};

const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {
  const containerOpacity = useSharedValue(1);

  // Logo-specific animations
  const logoOpacity = useSharedValue(1);
  const logoScale = useSharedValue(1);
  const logoTranslateY = useSharedValue(0);

  const { container, logo } = BootSplash.useHideAnimation({
    manifest: require("../../../assets/bootsplash/manifest.json"),
    logo: require("../../../assets/bootsplash/logo.png"),
    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Container fades out
      containerOpacity.value = withTiming(
        0,
        {
          duration: 700,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            scheduleOnRN(onAnimationEnd);
          }
        }
      );

      // Logo animation (fade + scale + soft slide up)
      logoOpacity.value = withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      });

      logoScale.value = withTiming(1.25, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      });

      logoTranslateY.value = withTiming(-20, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      });
    },
  });

  const containerAnimStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoAnimStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value },
    ],
  }));

  return (
    <Animated.View {...container} style={[container.style, containerAnimStyle]}>
      <Animated.Image {...logo} style={[logo.style, logoAnimStyle]} />
    </Animated.View>
  );
};

export default AnimatedBootSplash;
