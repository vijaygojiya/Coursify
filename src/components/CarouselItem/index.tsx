import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {getRandomImage} from '@/utils/helper';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
interface CarouselItemProps {
  index: number;
}
const CarouselItem = ({index}: CarouselItemProps) => {
  const width = useWindowDimensions().width;
  const {colors} = useTheme();

  return (
    <Animated.View style={[styles.itemContainer, {width}]}>
      <View
        style={[styles.imageContainer, {backgroundColor: colors.neutral10}]}>
        <Animated.Image
          source={{uri: getRandomImage(index)}}
          style={[styles.itemImage, {backgroundColor: colors.neutral40}]}
        />
      </View>
    </Animated.View>
  );
};

export default CarouselItem;
