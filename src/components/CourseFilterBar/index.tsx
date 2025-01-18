import {textStyles} from '@/styles';
import React, {useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const courseFilters = [
  {label: 'All', value: 'all'},
  {label: 'Free Courses', value: 'free'},
  {label: 'Paid Courses', value: 'paid'},
  {label: 'Short Courses', value: 'short'},
  {label: 'Long Courses', value: 'long'},
  {label: 'Most Popular', value: 'popular'},
  {label: 'Highest Rated', value: 'highestRated'},
  {label: 'Newest', value: 'newest'},
  {label: 'Oldest', value: 'oldest'},
  {label: 'Price: Low to High', value: 'priceLowToHigh'},
  {label: 'Price: High to Low', value: 'priceHighToLow'},
  {label: 'Most Liked', value: 'mostLiked'},
  {label: 'Most Viewed', value: 'mostViewed'},
  {label: 'Recently Completed', value: 'recentlyCompleted'},
];

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  const animatedValue = useDerivedValue(() => {
    return withTiming(isSelected ? 1 : 0, {duration: 368});
  });

  const aniTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedValue.value,
        [0, 1],
        ['#333333', '#ffffff'],
      ),
    };
  });
  const aniContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        ['#f1f1f1', '#2B7A78'],
      ),
    };
  });

  return (
    <Pressable style={[styless.chip, aniContainerStyle]} onPress={onPress}>
      <Animated.Text style={[textStyles.labelSmall, aniTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styless = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: '#2B7A78',
  },
  chipText: {
    fontSize: 14,
  },
  selectedChipText: {
    color: '#fff',
  },
});

const CourseFilterBar = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const listRef = useRef<FlatList | null>(null);

  return (
    <FlatList
      ref={listRef}
      data={courseFilters}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.value}
      renderItem={({item, index}) => (
        <FilterChip
          label={item.label}
          isSelected={selectedFilter === item.value}
          onPress={() => {
            setSelectedFilter(item.value);
            listRef.current?.scrollToIndex({
              index: index,
              animated: true,
              viewPosition: 0.5,
            });
          }}
        />
      )}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingRight: 16,
  },
});

export default CourseFilterBar;
