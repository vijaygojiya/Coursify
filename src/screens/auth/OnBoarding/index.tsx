import React from 'react';
import {AppStackScreensProps} from '@/types/navigation';
import {ScreenContainer} from '@/components';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import CarouselItem from './CarouselItem';
import type {SVGsNames} from '@/types/common';
import {useWindowDimensions} from 'react-native';

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

const OnBoarding = ({}: AppStackScreensProps<'OnBoarding'>) => {
  const translateX = useSharedValue(0);
  const {width} = useWindowDimensions();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const dividedValue = event.contentOffset.x / width;
      translateX.value = dividedValue;
      // runOnJS(setLastSlide)(dividedValue > 2.5);
    },
  });
  return (
    <ScreenContainer>
      <Animated.ScrollView
        bounces={false}
        // ref={scrollRef}
        onScroll={scrollHandler}
        horizontal={true}
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
