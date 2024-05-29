import {FlatList, ListRenderItem, ScrollView, Text} from 'react-native';
import React, {FC, Fragment} from 'react';
import {TabScreensProps} from '@/types/navigation';
import {ExploreData, sectionTitles} from '@/utils/dummy';
import ExploreCarousel from '@/components/ExploreCarousel';
import {ExploreListItem, ScreenContainer} from '@/components';
import {ICourse} from '@/types/courses';
import {textVariants} from '@/styles';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const Explore: FC<TabScreensProps<'Explore'>> = () => {
  const {colors} = useTheme();
  const renderItem: ListRenderItem<ICourse> = ({item, index}) => {
    return <ExploreListItem {...{...item, index}} />;
  };
  return (
    <ScreenContainer>
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <ExploreCarousel />
        {sectionTitles.map((title, index) => {
          return (
            <Fragment key={title + index}>
              <Text
                style={[
                  textVariants.h3,
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
                style={styles.listStyle}
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
