import React from 'react';
import {ImageBackground, Text, View, useWindowDimensions} from 'react-native';
import {getRandomImage} from '@/utils/helper';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {textStyles} from '@/styles';

interface CarouselItemProps {
  index: number;
}
const CarouselItem = ({index}: CarouselItemProps) => {
  const width = useWindowDimensions().width;
  const {colors} = useTheme();

  return (
    <View style={[styles.itemContainer, {width}]}>
      <View
        style={[styles.imageContainer, {backgroundColor: colors.neutral10}]}>
        <ImageBackground
          source={{uri: getRandomImage(index)}}
          style={[styles.itemImage, {backgroundColor: colors.neutral40}]}>
          <LinearGradient
            locations={[0, 1]}
            colors={[colors.transparent, colors.back]}
            style={styles.linearGradient}>
            <Text
              style={[
                textStyles.headlineMedium,
                {
                  textAlign: 'center',
                  marginBottom: 8,
                  color: colors.neutral10,
                },
              ]}>
              React Native
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default CarouselItem;
