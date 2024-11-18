import {
  ListRenderItem,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {TabScreensProps} from '@/types/navigation';
import {
  ExploreData,
  PopularInstructorsData,
  sectionTitles,
} from '@/utils/dummy';
import ExploreCarousel from '@/components/ExploreCarousel';
import {ExploreListItem, HorizontalListSection} from '@/components';
import {ICourse} from '@/types/courses';
import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from '@react-navigation/native';
import styles from './styles';
import PopularInstructorItem from '@/components/PopularInstructorItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {textVariants} from '@/styles';
import {useCurrentUser, useRefreshByUser} from '@/hooks';
import {getFirstName} from '@/utils/helper';
import BounceContainer from '@/components/BounceContainer';
import {Setting} from '@/assets';
import Routes from '@/router/routes';

const renderItem: ListRenderItem<ICourse> = ({item, index}) => {
  return <ExploreListItem {...{...item, index}} />;
};
const renderPopularInstructor: ListRenderItem<
  (typeof PopularInstructorsData)[number]
> = ({item: {name}, index}) => {
  return <PopularInstructorItem name={name} index={index} />;
};

const Explore = ({}: TabScreensProps<'Explore'>) => {
  //
  const scrollRef = useRef<ScrollView | null>(null);
  // console.log(navigation);
  const navigation = useNavigation();

  useScrollToTop(scrollRef);

  const {colors} = useTheme();

  const {data: user, refetch} = useCurrentUser({enabled: true});
  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView
      ref={scrollRef}
      overScrollMode="never"
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
          progressViewOffset={bottom + 22}
        />
      }
      contentContainerStyle={[
        styles.mainContentContainer,
        {paddingTop: bottom},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={{flex: 1}}>
          <Text style={[textVariants.h4, {color: colors.neutral100}]}>
            Hey, {getFirstName(user?.name)}
          </Text>
          <Text
            style={[
              textVariants.caption,
              styles.subTitle,
              {color: colors.neutral80},
            ]}>
            Learn something new today!
          </Text>
        </View>
        <BounceContainer
          onPress={() => {
            navigation.navigate(Routes.Setting);
          }}>
          <Setting />
        </BounceContainer>
      </View>
      {/**-promotion-**/}
      <ExploreCarousel />
      <HorizontalListSection
        onChevronPress={() => {
          navigation.navigate(Routes.CourseList, {type: sectionTitles[0]});
        }}
        title={sectionTitles[0]}
        keyExtractor={(item, i) => item.id + sectionTitles[0] + i}
        data={[
          ...ExploreData[0],
          ...ExploreData[0],
          ...ExploreData[0],
          ...ExploreData[0],
        ]}
        renderItem={renderItem}
      />

      <HorizontalListSection
        data={PopularInstructorsData}
        renderItem={renderPopularInstructor}
        title={'Popular Instructors'}
        keyExtractor={(item, i) => item.name + sectionTitles[0] + i}
      />
      {sectionTitles.slice(1).map((title, index) => {
        return (
          <HorizontalListSection
            key={title + index}
            title={title}
            onChevronPress={() => {
              navigation.navigate(Routes.CourseList, {type: title});
            }}
            keyExtractor={(item, i) => item.id + sectionTitles[0] + i}
            data={[
              ...ExploreData[index],
              ...ExploreData[index],
              ...ExploreData[index],
              ...ExploreData[index],
            ]}
            renderItem={renderItem}
          />
        );
      })}
    </ScrollView>
  );
};

export default Explore;
