import {FlatList, ListRenderItem, ScrollView, Text} from 'react-native';
import React, {FC, Fragment, useRef} from 'react';
import {TabScreensProps} from '@/types/navigation';
import {ExploreData, sectionTitles} from '@/utils/dummy';
import ExploreCarousel from '@/components/ExploreCarousel';
import {
  ExploreListItem,
  PopularInstructors,
  ScreenContainer,
} from '@/components';
import {ICourse} from '@/types/courses';
import {textVariants} from '@/styles';
import {useScrollToTop, useTheme} from '@react-navigation/native';
import styles from './styles';

const renderItem: ListRenderItem<ICourse> = ({item, index}) => {
  return <ExploreListItem {...{...item, index}} />;
};

const Explore: FC<TabScreensProps<'Explore'>> = () => {
  const {colors} = useTheme();
  const scrollRef = useRef<ScrollView | null>(null);
  useScrollToTop(scrollRef);

  return (
    <ScreenContainer>
      <ScrollView
        ref={scrollRef}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.mainContentContainer}
        showsVerticalScrollIndicator={false}>
        <ExploreCarousel />
        <Text
          style={[textVariants.h4, styles.title, {color: colors.neutral100}]}>
          {sectionTitles[0]}
        </Text>
        <FlatList
          data={[
            ...ExploreData[0],
            ...ExploreData[0],
            ...ExploreData[0],
            ...ExploreData[0],
          ]}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, i) => item.id + sectionTitles[0] + i}
          renderItem={renderItem}
        />
        <Text
          style={[textVariants.h4, styles.title, {color: colors.neutral100}]}>
          {'Popular Instructors'}
        </Text>
        <PopularInstructors />

        {sectionTitles.slice(1).map((title, index) => {
          return (
            <Fragment key={title + index}>
              <Text
                style={[
                  textVariants.h4,
                  styles.title,
                  {color: colors.neutral100},
                ]}>
                {title}
              </Text>
              <FlatList
                data={[
                  ...ExploreData[index],
                  ...ExploreData[index],
                  ...ExploreData[index],
                  ...ExploreData[index],
                ]}
                contentContainerStyle={styles.listContainer}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item, i) => item.id + title + i}
                renderItem={renderItem}
              />
            </Fragment>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

export default Explore;
