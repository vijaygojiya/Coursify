import {Image, Pressable, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import type {ICourse} from '@/types/courses';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import {textVariants} from '@/styles';
import {getRandomImage} from '@/utils/helper';
import {BookMarkFill, BookMarkLine, StartLine} from '@/assets';

interface ExploreListItemProps extends ICourse {
  index: number;
}

const ExploreListItem = ({
  title,
  instructor,
  rating,
  index,
}: ExploreListItemProps) => {
  const [isBookMarked, setBookMark] = useState(false);
  const {colors} = useTheme();
  const uri = useMemo(() => {
    return getRandomImage(index);
  }, [index]);
  return (
    <View style={[styles.container, {backgroundColor: colors.neutral10}]}>
      <Image
        source={{uri}}
        style={[styles.image, {backgroundColor: colors.neutral30}]}
      />
      <Text
        numberOfLines={2}
        style={[textVariants.h5, styles.title, {color: colors.neutral100}]}>
        {title}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          textVariants.caption,
          styles.instructor,
          {color: colors.neutral70},
        ]}>
        {instructor}
      </Text>
      <View style={styles.footerContainer}>
        <Text
          numberOfLines={1}
          style={[textVariants.caption, {color: colors.neutral60}]}>
          {rating}
        </Text>
        <StartLine height={18} width={18} />
        <View style={styles.spacer} />
        <Pressable
          hitSlop={5}
          onPress={() => {
            setBookMark(v => !v);
          }}>
          {isBookMarked ? <BookMarkFill /> : <BookMarkLine />}
        </Pressable>
      </View>
    </View>
  );
};

export default ExploreListItem;
