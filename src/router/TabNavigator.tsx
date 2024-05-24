/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Routes from './routes';
import {ExploreScreen, LearnScreen, SearchScreen} from '@/screens';
import {TabParamList} from '@/types/navigation';
import {View} from 'react-native';
import {BookIcon, ExploreIcon, SearchIcon} from '@/screens/tabs/icons';
import {TabBarButton} from './TabBarButton';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name={Routes.Explore}
        component={ExploreScreen}
        options={{
          tabBarButton: ({accessibilityState, onPress}) => (
            <TabBarButton
              title="Explore"
              focused={accessibilityState?.selected}
              icon={ExploreIcon}
              onPress={onPress}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Search}
        component={SearchScreen}
        options={{
          tabBarButton: ({accessibilityState, onPress}) => (
            <TabBarButton
              title="Search"
              focused={accessibilityState?.selected}
              icon={SearchIcon}
              onPress={onPress}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Learn}
        component={LearnScreen}
        options={{
          tabBarButton: ({accessibilityState, onPress}) => (
            <TabBarButton
              title="Learn"
              focused={accessibilityState?.selected}
              icon={BookIcon}
              onPress={onPress}
            />
          ),
        }}
        e
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
