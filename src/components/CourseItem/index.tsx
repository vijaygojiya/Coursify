import {Image, Pressable, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {MockData} from '@/utils/dummy';
import {useTheme} from '@react-navigation/native';
import {textVariants} from '@/styles';
import {randomCourseImage} from '@/types/constant';

type IItem = (typeof MockData)['Newest Courses'][number];

interface CourseItemProps extends IItem {}
const CourseItem = ({instructor, title}: CourseItemProps) => {
  console.log(title);
  const {colors} = useTheme();
  return (
    <Pressable style={[styles.container, {backgroundColor: colors.neutral10}]}>
      <Image
        source={{uri: randomCourseImage}}
        style={[styles.img, {backgroundColor: colors.primaryBorder}]}
      />
      <Text style={[textVariants.h5, {color: colors.neutral100}]}>{title}</Text>
      <Text style={[textVariants.small, {color: colors.neutral80}]}>
        {instructor}
      </Text>
    </Pressable>
  );
};

export default CourseItem;
