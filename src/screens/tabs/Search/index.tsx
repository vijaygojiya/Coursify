import {FlatList, ListRenderItem} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {TabScreensProps} from '@/types/navigation';
import {CategoryItem, SearchPlaceholder} from '@/components';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import styles from './styles';
import Routes from '@/router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const courseCategories = [
  'AI & Machine Learning',
  'Data Science',
  'Web Development',
  'Mobile App Development',
  'Content Creation',
  'Social Media Marketing',
  'Photography & Video',
  'Video Editing, VFX, Motion',
  'Graphic Design, UI/UX',
  'Digital Marketing',
];

const getKeyIndex = (item: string, index: number) => `${item}-${index}`;

const Search = ({}: TabScreensProps<'Search'>) => {
  const listRef = useRef<FlatList | null>(null);
  useScrollToTop(listRef);
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<TabScreensProps<'Search'>['navigation']>();

  const renderItem: ListRenderItem<string> = useCallback(
    ({item}) => {
      return (
        <CategoryItem
          title={item}
          onPress={() => {
            navigation.navigate(Routes.CourseList, {type: item});
          }}
        />
      );
    },
    [navigation],
  );
  return (
    <FlatList
      ref={listRef}
      numColumns={2}
      data={courseCategories}
      renderItem={renderItem}
      ListHeaderComponent={<SearchPlaceholder />}
      keyExtractor={getKeyIndex}
      bounces={false}
      overScrollMode="never"
      contentContainerStyle={[styles.contentContainer, {paddingTop: top + 8}]}
      columnWrapperStyle={styles.columnContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Search;
