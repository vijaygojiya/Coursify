import React from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {TabBarButton} from './TabBarButton';
import {AppScreenProps, BottomTabParamsList} from '@/typings/navigation';
import {BookIcon, ExploreIcon, SearchIcon} from './icons';
import Routes from './Routes';
import {ExploreScreen, SearchScreen} from '@/screens';
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

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const BottomNavigator = ({}: AppScreenProps<'Dashboard'>) => {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen
        name={Routes.Explore}
        component={ExploreScreen}
        options={{tabBarButton: exploreTabBarButton}}
      />
      <Tab.Screen
        name={Routes.Search}
        component={SearchScreen}
        options={{tabBarButton: searchTabBarButton}}
      />
      <Tab.Screen
        name={Routes.Learn}
        component={TopTabNavigator}
        options={{
          tabBarButton: renderLeanTabBarButton,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
