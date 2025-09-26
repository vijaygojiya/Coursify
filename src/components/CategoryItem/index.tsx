import {ImageBackground, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {textStyles} from '@/styles';
import {randomCourseImage} from '@/utils/constant';

const CategoryItem = ({title = '', onPress = () => {}}) => {
  const {colors} = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{uri: randomCourseImage}}
        style={[styles.bgImg, {backgroundColor: colors.neutral50}]}>
        <LinearGradient
          style={styles.linearGradientContainer}
          locations={[0.3, 1]}
          colors={[colors.transparent, colors.neutral100]}>
          <Text
            numberOfLines={2}
            style={[
              textStyles.titleMedium,
              styles.title,
              {color: colors.neutral20},
            ]}>
            {title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 176,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bgImg: {
    flex: 1,
  },
  linearGradientContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
});
