import {FlatList, ListRenderItem, StyleSheet, Text} from 'react-native';
import React, {useRef} from 'react';
import {PopularInstructorsData} from '@/utils/dummy';
import PopularInstructorItem from '../PopularInstructorItem';
import {useTheme} from '@react-navigation/native';
import {textVariants} from '@/styles';

const renderPopularInstructor: ListRenderItem<
  (typeof PopularInstructorsData)[number]
> = ({item: {name}, index}) => {
  return <PopularInstructorItem name={name} index={index} />;
};

const PopularInstructors = () => {
  const listRef = useRef<FlatList | null>(null);
  const {colors} = useTheme();
  const handleScrollToTop = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({offset: 0, animated: true});
    });
  };
  return (
    <>
      <Text
        onPress={handleScrollToTop}
        style={[textVariants.h4, styles.title, {color: colors.neutral100}]}>
        {'Popular Instructors'}
      </Text>
      <FlatList
        ref={listRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={PopularInstructorsData}
        contentContainerStyle={styles.listContainer}
        renderItem={renderPopularInstructor}
      />
    </>
  );
};

export default PopularInstructors;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 22,
    columnGap: 22,
    marginVertical: 14,
  },
  title: {
    marginTop: 2,
    marginBottom: 12,
    marginStart: 22,
  },
});
