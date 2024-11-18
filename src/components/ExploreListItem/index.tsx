import {Image, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import type {ICourse} from '@/types/courses';
import {useNavigation, useTheme} from '@react-navigation/native';
import styles from './styles';
import {textVariants} from '@/styles';
import {getRandomImage} from '@/utils/helper';
import {StarFill} from '@/assets';
import BounceContainer from '../BounceContainer';

interface ExploreListItemProps extends ICourse {
  index: number;
}

const ExploreListItem = ({
  title,
  instructor,
  rating,
  index,
}: ExploreListItemProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const uri = useMemo(() => {
    return getRandomImage(index);
  }, [index]);

  return (
    <BounceContainer
      onPress={() => {
        navigation.navigate('CourseDetail');
      }}
      style={[styles.container]}>
      <Image
        source={{uri}}
        style={[styles.image, {backgroundColor: colors.neutral50}]}
      />
      <Text
        numberOfLines={1}
        style={[textVariants.h5, styles.title, {color: colors.back}]}>
        {title}
      </Text>
      <View style={styles.footerContainer}>
        <Text
          numberOfLines={1}
          style={[
            textVariants.caption,
            styles.instructor,
            {color: colors.neutral80},
          ]}>
          {instructor}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            textVariants.caption,
            {marginEnd: 6, color: colors.neutral80},
          ]}>
          {rating}
        </Text>
        <StarFill height={18} width={18} fill={colors.neutral80} />
      </View>
      {/* <Pressable
        style={{
          position: 'absolute',
          right: 8,
          top: 8,
          // backgroundColor: colors.transparent20,
          padding: 8,
          borderRadius: 28,
        }}
        hitSlop={5}
        onPress={() => {
          setBookMark(v => !v);
        }}>
        {isBookMarked ? <BookMarkFill fill={'red'} /> : <BookMarkLine />}
      </Pressable> */}
    </BounceContainer>
  );
};

export default ExploreListItem;
