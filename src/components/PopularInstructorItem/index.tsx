import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import {textVariants} from '@/styles';
import {useTheme} from '@react-navigation/native';
import {getRandomUserImage} from '@/utils/helper';
import BounceContainer from '../BounceContainer';

const PopularInstructorItem = ({name = '', index = 0}) => {
  const {colors} = useTheme();
  return (
    <BounceContainer style={styles.container}>
      <Image
        source={{uri: getRandomUserImage(index)}}
        style={[styles.image, {backgroundColor: colors.neutral30}]}
      />
      <Text style={[textVariants.caption, {color: colors.neutral90}]}>
        {name}
      </Text>
    </BounceContainer>
  );
};

export default PopularInstructorItem;

const styles = StyleSheet.create({
  container: {
    width: 142,
    alignItems: 'center',
    rowGap: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 81,
  },
});
