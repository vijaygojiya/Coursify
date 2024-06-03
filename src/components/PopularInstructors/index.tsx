import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React from 'react';
import {PopularInstructorsData} from '@/utils/dummy';
import PopularInstructorItem from '../PopularInstructorItem';

const PopularInstructors = () => {
  const renderPopularInstructor: ListRenderItem<
    (typeof PopularInstructorsData)[number]
  > = ({item: {name}, index}) => {
    return <PopularInstructorItem name={name} index={index} />;
  };
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={PopularInstructorsData}
      contentContainerStyle={styles.listContainer}
      renderItem={renderPopularInstructor}
    />
  );
};

export default PopularInstructors;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 22,
    columnGap: 22,
    marginVertical: 14,
  },
});
