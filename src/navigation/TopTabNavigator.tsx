import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ColorValue, Dimensions, Text, View } from "react-native";
import { BottomTabScreensProps, TopTabParamsList } from "@/typings/navigation";
import { DownloadIcon, HeartIcon, HourglassIcon } from "@/assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const renderDownloadIcon = ({ color }: { color: ColorValue }) => {
  return <DownloadIcon strokeWidth={2} stroke={color} />;
};

const renderFavIcon = ({ color }: { color: ColorValue }) => {
  return <HeartIcon strokeWidth={2} stroke={color} />;
};

const renderProgressIcon = ({ color }: { color: ColorValue }) => {
  return <HourglassIcon strokeWidth={2} stroke={color} />;
};

const screenWidth = Dimensions.get("window").width;

const HomeScree = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Coming Soon</Text>
    </View>
  );
};

const TopTab = createMaterialTopTabNavigator<TopTabParamsList>();

const TopTabNavigator = (_: BottomTabScreensProps<"Learn">) => {
  const { top } = useSafeAreaInsets();

  return (
    <TopTab.Navigator
      initialLayout={{ width: screenWidth }}
      screenOptions={({ theme: { colors } }) => {
        return {
          tabBarAndroidRipple: { borderless: false },
          tabBarStyle: {
            marginTop: top,
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
        };
      }}
    >
      <TopTab.Screen
        name="Inprogress"
        getComponent={() => HomeScree}
        options={{ tabBarIcon: renderProgressIcon }}
      />
      <TopTab.Screen
        name="Favorite"
        getComponent={() => HomeScree}
        options={{ tabBarIcon: renderFavIcon }}
      />
      <TopTab.Screen
        name="Downloaded"
        getComponent={() => HomeScree}
        options={{ tabBarIcon: renderDownloadIcon }}
      />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
