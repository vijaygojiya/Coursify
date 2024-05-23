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
import {useTheme} from '@react-navigation/native';
import styles from './styles';
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
      <Text style={[textVariants.caption, {color: colors.neutral70}]}>
        {subTitle}
      </Text>
    </View>
  );
};

export default CarouselItem;
