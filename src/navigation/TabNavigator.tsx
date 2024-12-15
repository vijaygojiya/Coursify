import {View} from 'react-native';
import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Temp = () => <View />;

const tabScreenOptions: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Home" component={Temp} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
