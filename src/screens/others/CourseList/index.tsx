import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppStackScreensProps} from '@/types/navigation';
import {useQuery} from '@tanstack/react-query';
import {MockData} from '@/utils/dummy';
import {CourseFilterBar, CourseItem} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {useRefreshByUser} from '@/hooks';
import {useNavigation, useTheme} from '@react-navigation/native';
type MockDataKey = keyof typeof MockData;

const renderItem: ListRenderItem<
  (typeof MockData)['Newest Courses'][number]
> = ({item}) => {
  return <CourseItem {...item} />;
};

const renderKeyExtractor = (
  item: (typeof MockData)['Newest Courses'][number],
  index: number,
) => {
  return `${item.id}-${index}`;
};

const CourseList = ({route}: AppStackScreensProps<'CourseList'>) => {
  const navigation =
    useNavigation<AppStackScreensProps<'CourseList'>['navigation']>();
  const {bottom} = useSafeAreaInsets();
  const type = route.params.type as unknown as MockDataKey;

  const {data, refetch} = useQuery({
    queryFn: async () => {
      if (type in MockData) {
        return [...MockData[type], ...MockData[type], ...MockData[type]];
      }
      return [];
    },
    queryKey: [type],
  });

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  useEffect(() => {
    navigation.setOptions({title: type});
  }, [navigation, type]);
  const {colors} = useTheme();
  return (
    <React.Fragment>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={data}
        overScrollMode="never"
        ListHeaderComponent={<CourseFilterBar />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        renderItem={renderItem}
        keyExtractor={renderKeyExtractor}
        contentContainerStyle={[
          styles.listContentStyle,
          {backgroundColor: colors.neutral10, paddingBottom: bottom},
        ]}
        showsVerticalScrollIndicator={false}
      />
    </React.Fragment>
  );
};

export default CourseList;