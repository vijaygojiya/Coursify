import {ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';
import BounceContainer from '../BounceContainer';
import {randomCourseImage} from '@/types/constant';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {textVariants} from '@/styles';

const CategoryItem = ({title = '', onPress = () => {}}) => {
  const {colors} = useTheme();
  return (
    <BounceContainer onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{uri: randomCourseImage}}
        style={[styles.bgImg, {backgroundColor: colors.neutral50}]}>
        <LinearGradient
          style={styles.linearGradientContainer}
          locations={[0.3, 1]}
          colors={[colors.transparent, colors.neutral100]}>
          <Text style={[textVariants.h4, {color: colors.neutral20}]}>
            {title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </BounceContainer>
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
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
});
