import React from 'react';
import {AppStackScreensProps} from '@/types/navigation';
import {ScreenContainer} from '@/components';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
} from 'react-native-reanimated';
import CarouselItem from './CarouselItem';
import type {SVGsNames} from '@/types/common';
import {View, useWindowDimensions} from 'react-native';
import styles from './styles';
import DotIndicator from './DotIndicator';
import {useTheme} from '@react-navigation/native';
const DATA_CONFIG: {
  title: string;
  subTitle: string;
  vector: SVGsNames;
}[] = [
  {
    title: 'Ignite Your Journey',
    subTitle:
      'Embark on an educational adventure where creativity knows no bounds. Get ready to launch your ideas into the stratosphere with the power of knowledge and innovation.',
    vector: 'IdeaLaunch',
  },
  {
    title: 'Reach for the Stars',
    subTitle:
      'There are no limits to what you can achieve. As you journey from the ground to the cosmos, explore endless possibilities and unlock your full potential.',
    vector: 'ManRidingRocket',
  },
  {
    title: 'Unbox Your Potential',
    subTitle:
      "Unleash your inner genius and watch your dreams take flight. With every challenge, you're equipped to blast off and make a significant impact in the world.",
    vector: 'ProductLaunch',
  },
  {
    title: 'Illuminate Your Mind',
    subTitle:
      'Dive into a world of endless discovery. With each page you turn, light up your imagination and spark new ideas that will shape your future.',
    vector: 'Studying',
  },
  {
    title: 'Your Journey Begins Now',
    subTitle:
      "Welcome to a community of dreamers, doers, and innovators. Together, we'll create, explore, and achieve greatness. Let's embark on this incredible journey!",
    vector: 'Engineer',
  },
];

export const DOT_SIZE = 8;
export const DOT_SPACING = 8;
export const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const OnBoarding = ({}: AppStackScreensProps<'OnBoarding'>) => {
  //

  const {colors} = useTheme();

  const {width} = useWindowDimensions();

  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);
  const translateX = useDerivedValue(() => {
    return scrollOffset.value / width;
  });

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [0, 4],
            [0, DOT_INDICATOR_SIZE * 4],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  const indicatorContainer = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [3, 4], [1, 0]),
    };
  });

  return (
    <ScreenContainer>
      <View style={styles.overlayContainer}>
        <View style={styles.spacer} pointerEvents="box-none" />
        <Animated.View style={[styles.indicatorContainer, indicatorContainer]}>
          <Animated.View
            style={[
              styles.ringCircle,
              {borderColor: colors.primaryBorder},
              translateStyle,
            ]}
          />
          {DATA_CONFIG.map((_, index) => {
            return (
              <DotIndicator key={index} animatedX={translateX} index={index} />
            );
          })}
        </Animated.View>
      </View>
      <Animated.ScrollView
        ref={animatedRef}
        horizontal={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        disableIntervalMomentum
        pagingEnabled>
        {DATA_CONFIG.map((item, index) => {
          return (
            <CarouselItem
              key={'OnBoarding-Carousel' + index}
              {...item}
              index={index}
              animatedX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
    </ScreenContainer>
  );
};

export default OnBoarding;
