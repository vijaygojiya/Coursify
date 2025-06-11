import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

import {useTheme} from '@react-navigation/native';
import {getRandomUserImage} from '@/utils/helper';
import {textStyles} from '@/styles';

const PopularInstructorItem = ({name = '', index = 0}) => {
  const {colors} = useTheme();
  return (
    <Pressable style={styles.container}>
      <Image
        source={{uri: getRandomUserImage(index)}}
        style={[styles.image, {backgroundColor: colors.neutral50}]}
      />
      <Text style={[textStyles.bodySmall, {color: colors.neutral90}]}>
        {name}
      </Text>
    </Pressable>
  );
};

export default PopularInstructorItem;

const styles = StyleSheet.create({
  container: {
    width: 116,
    alignItems: 'center',
    rowGap: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 81,
  },
});
