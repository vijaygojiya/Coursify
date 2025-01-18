import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Animated, {
  SharedValue,
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {AppButton} from '@/components';
import {PlaceholderIcon} from '@/assets';
import {AppScreenProps} from '@/typings/navigation';
import {useTheme} from '@react-navigation/native';
import {AppRoutes} from '@/navigation';
import DotIndicator from './DotIndicator';
import {textStyles} from '@/styles';

const data = [
  {
    title: 'Ignite Your Journey',
    subTitle:
      'Embark on an educational adventure where creativity knows no bounds. Get ready to launch your ideas into the stratosphere with the power of knowledge and innovation.',
  },
  {
    title: 'Reach for the Stars',
    subTitle:
      'There are no limits to what you can achieve. As you journey from the ground to the cosmos, explore endless possibilities and unlock your full potential.',
  },
  {
    title: 'Unbox Your Potential',
    subTitle:
      "Unleash your inner genius and watch your dreams take flight. With every challenge, you're equipped to blast off and make a significant impact in the world.",
  },
  {
    title: 'Illuminate Your Mind',
    subTitle:
      'Dive into a world of endless discovery. With each page you turn, light up your imagination and spark new ideas that will shape your future.',
  },
  {
    title: 'Your Journey Begins Now',
    subTitle:
      "Welcome to a community of dreamers, doers, and innovators. Together, we'll create, explore, and achieve greatness. Let's embark on this incredible journey!",
  },
];

const screenWidth = Dimensions.get('screen').width;

const Onboarding = ({navigation}: AppScreenProps<'Onboarding'>) => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const {colors} = useTheme();

  const handleGetStarted = () => {
    navigation.replace(AppRoutes.Login);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={animatedRef}
        horizontal={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        disableIntervalMomentum={true}
        pagingEnabled={true}>
        {data.map(({title, subTitle}, index) => {
          return (
            <View key={`onboarding-page-${index}`} style={styles.itemContainer}>
              <PlaceholderIcon
                style={styles.placeholderSvg}
                height={screenWidth - 80}
                width={screenWidth - 80}
              />
              <Text
                style={[
                  styles.title,
                  textStyles.headlineSmall,
                  {color: colors.text},
                ]}>
                {title}
              </Text>
              <Text
                style={[
                  styles.subTitle,
                  textStyles.bodySmall,
                  {color: colors.neutral70},
                ]}>
                {subTitle}
              </Text>

              <AppButton
                disabled={index + 1 !== data.length}
                containerStyle={[
                  styles.getStartedBtnContainer,
                  index + 1 !== data.length
                    ? {backgroundColor: colors.transparent}
                    : {},
                ]}
                onPress={handleGetStarted}
                title="Get Started"
              />
            </View>
          );
        })}
      </Animated.ScrollView>
      <Indicators scrollOffset={scrollOffset} />
    </SafeAreaView>
  );
};

export default Onboarding;

const Indicators = ({scrollOffset}: {scrollOffset: SharedValue<number>}) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.indicatorContainer,
        {
          bottom: bottom + 28,
        },
      ]}>
      {data.map((_, index) => {
        return (
          <DotIndicator
            index={index}
            animatedX={scrollOffset}
            key={'indicator' + index}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginHorizontal: 22,
    textAlign: 'center',
    marginTop: 22,
  },
  subTitle: {
    textAlign: 'center',
    marginHorizontal: 22,
  },

  itemContainer: {
    flex: 1,
    rowGap: 6,
    width: screenWidth,
    justifyContent: 'center',
  },
  placeholderSvg: {
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  getStartedBtnContainer: {
    marginHorizontal: 22,
    marginBottom: 68,
  },
});
