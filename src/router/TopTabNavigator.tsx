import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, ColorValue, Dimensions, View} from 'react-native';
import {Download, Hourglass, Profile} from '@/assets';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import colors from '@/styles/colors';
import {AppButton} from '@/components';
import {useAuth} from '@/hooks';

const renderDownloadIcon = ({color}: {color: ColorValue}) => {
  return <Download strokeWidth={2} stroke={color} />;
};

const renderFavIcon = ({color}: {color: ColorValue}) => {
  return <Profile strokeWidth={2} stroke={color} />;
};

const renderProgress = ({color}: {color: ColorValue}) => {
  return <Hourglass strokeWidth={2} stroke={color} />;
};

const screenWidth = Dimensions.get('window').width;
const HomeScree = () => {
  const {logOut} = useAuth();
  return (
    <View>
      <AppButton title="Logout" onPress={logOut} />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator({
  initialLayout: {width: screenWidth},

  screenOptions: {
    tabBarStyle: {
      paddingTop: initialWindowMetrics?.insets.top,
      elevation: undefined,
    },
    tabBarActiveTintColor: colors.primaryMain,
    tabBarInactiveTintColor: colors.neutral50,
    tabBarShowLabel: false,
    tabBarIndicatorStyle: {
      backgroundColor: colors.primaryMain,
      height: 2,
      borderRadius: 12,
      borderTopEndRadius: 12,
      borderTopStartRadius: 12,
    },
  },
  screens: {
    Inprogress: {
      screen: HomeScree,
      options: {
        tabBarIcon: renderProgress,
      },
    },
    Favorite: {
      screen: HomeScree,
      options: {
        tabBarIcon: renderFavIcon,
      },
    },
    Downloaded: {
      screen: HomeScree,
      options: {
        tabBarIcon: renderDownloadIcon,
      },
    },
  },
});

export default Tab;
