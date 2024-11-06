import React from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ExploreScreen, SearchScreen} from '@/screens';
import {BookIcon, ExploreIcon, SearchIcon} from '@/screens/tabs/icons';
import {TabBarButton} from './TabBarButton';
import TopTabNavigator from './TopTabNavigator';

const exploreTabBarButton = ({
  accessibilityState,
  onPress,
}: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Explore"
    focused={accessibilityState?.selected}
    icon={ExploreIcon}
    onPress={onPress}
  />
);

const searchTabBarButton = ({
  accessibilityState,
  onPress,
}: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Search"
    focused={accessibilityState?.selected}
    icon={SearchIcon}
    onPress={onPress}
  />
);

const renderLeanTabBarButton = ({
  accessibilityState,
  onPress,
}: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Learn"
    focused={accessibilityState?.selected}
    icon={BookIcon}
    onPress={onPress}
  />
);

const getScreenOptions = (): BottomTabNavigationOptions => {
  return {
    lazy: true,
    headerShown: false,
    animation: 'shift',
  };
};

const MyTabs = createBottomTabNavigator({
  screenOptions: getScreenOptions,
  screens: {
    Explore: {
      screen: ExploreScreen,
      options: {tabBarButton: exploreTabBarButton},
    },
    Search: {
      screen: SearchScreen,
      options: {tabBarButton: searchTabBarButton},
    },
    Learn: {
      screen: TopTabNavigator,
      options: {tabBarButton: renderLeanTabBarButton},
    },
  },
});

export default MyTabs;
