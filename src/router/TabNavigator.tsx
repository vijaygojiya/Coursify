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
import {TabParamList} from '@/types/navigation';
import Routes from './routes';

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

const Tab = createBottomTabNavigator<TabParamList>();

const BottomNavigator = () => {
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
        options={{tabBarButton: renderLeanTabBarButton}}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
