import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ColorValue, Dimensions, View} from 'react-native';
import {Download, Heart, Hourglass} from '@/assets';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import colors from '@/styles/colors';
import {AppButton, CheckBox} from '@/components';
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
    <View>
      <AppButton title="Logout" onPress={() => {}} />
      <CheckBox playOnMount={true} />
    </View>
  );
};

const TopTab = createMaterialTopTabNavigator<TopTabParamsList>();
const TopTabNavigator = () => {
  return (
    <TopTab.Navigator
      initialLayout={{width: screenWidth}}
      screenOptions={{
        tabBarStyle: {
          paddingTop: initialWindowMetrics?.insets.top,
          elevation: undefined,
        },
        tabBarActiveTintColor: colors.primaryMain,
        tabBarInactiveTintColor: colors.neutral50,
        tabBarShowLabel: false,
        tabBarIndicatorContainerStyle: {},
        tabBarIndicatorStyle: {
          backgroundColor: colors.primaryMain,
          height: 3,
          borderTopEndRadius: 8,
          borderTopStartRadius: 8,
          width: (screenWidth - 23 * 6) / 3,
          marginHorizontal: 23,
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
