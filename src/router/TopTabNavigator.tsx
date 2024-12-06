import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ColorValue, Dimensions, Text, View} from 'react-native';
import {Download, Heart, Hourglass} from '@/assets';
import colors from '@/styles/colors';
import {TopTabParamsList} from '@/types/navigation';

const renderDownloadIcon = ({color}: {color: ColorValue}) => {
  return <Download strokeWidth={2} stroke={color} />;
};

const renderFavIcon = ({color}: {color: ColorValue}) => {
  return <Heart strokeWidth={2} stroke={color} />;
};

const renderProgressIcon = ({color}: {color: ColorValue}) => {
  return <Hourglass strokeWidth={2} stroke={color} />;
};

const screenWidth = Dimensions.get('window').width;

const HomeScree = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Coming Soon</Text>
    </View>
  );
};

const TopTab = createMaterialTopTabNavigator<TopTabParamsList>();

const TopTabNavigator = () => {
  return (
    <TopTab.Navigator
      initialLayout={{width: screenWidth}}
      screenOptions={{
        tabBarAndroidRipple: {borderless: false},
        tabBarStyle: {
          elevation: undefined,
        },

        tabBarActiveTintColor: colors.primaryMain,
        tabBarInactiveTintColor: colors.neutral50,
        tabBarShowLabel: false,
        tabBarIndicatorContainerStyle: {},
        tabBarIndicatorStyle: {
          backgroundColor: colors.primaryMain,
          height: 2,
          borderTopEndRadius: 8,
          borderTopStartRadius: 8,
          width: (screenWidth - 32 * 6) / 3,
          marginHorizontal: 32,
        },
      }}>
      <TopTab.Screen
        name="Inprogress"
        component={HomeScree}
        options={{tabBarIcon: renderProgressIcon}}
      />
      <TopTab.Screen
        name="Favorite"
        component={HomeScree}
        options={{tabBarIcon: renderFavIcon}}
      />
      <TopTab.Screen
        name="Downloaded"
        component={HomeScree}
        options={{tabBarIcon: renderDownloadIcon}}
      />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
