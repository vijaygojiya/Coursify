import { Image, Pressable, Text, View } from 'react-native';
import React, { useMemo } from 'react';

import { useNavigation, useTheme } from '@react-navigation/native';

import { textStyles } from '@/styles';
import { StarFillIcon } from '@/assets';
import { getRandomImage } from '@/utils';
import styles from './styles';
import type { ICourse } from '@/typings/types';
import Routes from '@/navigation/Routes';

interface ExploreListItemProps extends ICourse {
  index: number;
}

const ExploreListItem = ({
  title,
  instructor,
  rating,
  index,
}: ExploreListItemProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const uri = useMemo(() => {
    return getRandomImage(index);
  }, [index]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(Routes.CourseDetail);
      }}
      style={[styles.container]}
    >
      <Image
        source={{ uri }}
        style={[styles.image, { backgroundColor: colors.neutral50 }]}
      />
      <Text
        numberOfLines={1}
        style={[textStyles.bodyMedium, styles.title, { color: colors.back }]}
      >
        {title}
      </Text>
      <View style={styles.footerContainer}>
        <Text
          numberOfLines={1}
          style={[
            textStyles.bodySmall,
            styles.instructor,
            { color: colors.neutral80 },
          ]}
        >
          {instructor.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            textStyles.bodyMedium,
            { marginEnd: 6, color: colors.neutral80 },
          ]}
        >
          {rating}
        </Text>
        <StarFillIcon height={18} width={18} fill={colors.neutral80} />
      </View>
    </Pressable>
  );
};

export default ExploreListItem;
