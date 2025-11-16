import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {MockData} from '@/utils/dummy';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {useRefreshByUser} from '@/hooks';
import {CourseItem} from '@/components';
import {AppScreenProps} from '@/typings/navigation';

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

const CourseList = ({route}: AppScreenProps<'CourseList'>) => {
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

  const {colors} = useTheme();
  return (
    <React.Fragment>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={data}
        overScrollMode="never"
        // ListHeaderComponent={<CourseFilterBar />}
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
          {
            backgroundColor: colors.neutral10,

            paddingBottom: bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </React.Fragment>
  );
};

export default CourseList;
