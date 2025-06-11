import {ListRenderItem, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useRef} from 'react';

import {
  ExploreData,
  PopularInstructorsData,
  sectionTitles,
} from '@/utils/dummy';

import {useScrollToTop, useTheme} from '@react-navigation/native';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getFirstName} from '@/utils/helper';

import {BottomTabScreensProps} from '@/typings/navigation';
import {textStyles} from '@/styles';
import {ICourse} from '@/typings/types';
import {
  ExploreCarousel,
  ExploreListItem,
  HorizontalListSection,
  PopularInstructorItem,
} from '@/components';
import useCurrentUser from '@/hooks/useCurrentUser';
import {NotificationIcon} from '@/assets';
import {AppRoutes} from '@/navigation';

const renderItem: ListRenderItem<ICourse> = ({item, index}) => {
  return <ExploreListItem {...{...item, index}} />;
};
const renderPopularInstructor: ListRenderItem<
  (typeof PopularInstructorsData)[number]
> = ({item: {name}, index}) => {
  return <PopularInstructorItem name={name} index={index} />;
};

const Explore = ({navigation}: BottomTabScreensProps<'Explore'>) => {
  //
  const scrollRef = useRef<ScrollView | null>(null);

  useScrollToTop(scrollRef);

  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();

  const {data: user} = useCurrentUser();

  return (
    <ScrollView
      ref={scrollRef}
      overScrollMode="never"
      contentContainerStyle={[styles.mainContentContainer, {paddingTop: top}]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.flex1}>
          <Text style={[textStyles.displaySmall, {color: colors.neutral100}]}>
            Hey, {getFirstName(user?.name)}
          </Text>
          <Text
            style={[
              textStyles.bodyMedium,
              styles.subTitle,
              {color: colors.neutral80},
            ]}>
            Learn something new today!
          </Text>
        </View>
        <Pressable
          style={[styles.notificationIcon, {borderColor: colors.back}]}>
          <NotificationIcon stroke={colors.back} />
        </Pressable>
      </View>
      {/**-promotion-**/}
      <ExploreCarousel />
      <HorizontalListSection
        onChevronPress={() => {
          navigation.navigate(AppRoutes.CourseList, {type: sectionTitles[0]});
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
        snapToInterval={220 + 14}
        decelerationRate="fast"
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
            snapToInterval={220 + 14}
            decelerationRate="fast"
            key={title + index}
            title={title}
            onChevronPress={() => {
              navigation.navigate(AppRoutes.CourseList, {type: title});
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
