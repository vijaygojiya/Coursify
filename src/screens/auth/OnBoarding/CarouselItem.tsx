import {Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import * as SVGs from '@/assets';
import type {SVGsNames} from '@/types/common';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {textVariants} from '@/styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import styles from './styles';
import {AppButton} from '@/components';
import {AppStackScreensProps} from '@/types/navigation';
import Routes from '@/router/routes';
interface CarouselItemProps {
  vector: SVGsNames;
  animatedX: SharedValue<number>;
  index: number;
  title: string;
  subTitle: string;
}

const CarouselItem = ({
  vector,
  index,
  animatedX,
  subTitle,
  title,
}: CarouselItemProps) => {
  const navigation =
    useNavigation<AppStackScreensProps<'Login'>['navigation']>();
  console.log('navigation', navigation);
  const VectorImage = SVGs[vector];
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  const animStyle = useAnimatedStyle(() => {
    const iRange = [index - 1, index, index + 1];
    const scale = interpolate(
      animatedX.value,
      iRange,
      [0.9, 1.4, 0.9],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      animatedX.value,
      iRange,
      [-45, 0, -45],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale}, {translateY}],
      alignSelf: 'center',
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedX.value, [3, 4], [0, 1]),
    };
  });

  return (
    <View style={[styles.container, {width}]}>
      <Animated.View style={animStyle}>
        <VectorImage height={240} />
      </Animated.View>
      <Text style={[textVariants.h3, {color: colors.neutral100}, styles.title]}>
        {title}
      </Text>
      <Text
        numberOfLines={3}
        style={[
          textVariants.caption,
          {color: colors.neutral70},
          styles.subTitle,
        ]}>
        {subTitle}
      </Text>
      {index === 4 ? (
        <Animated.View style={opacityStyle}>
          <AppButton
            onPress={() => {
              navigation.replace(Routes.Login);
            }}
            title={'Get Started'}
            containerStyle={styles.btnContainer}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default CarouselItem;
