import React from "react";
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { TabBarButton } from "./TabBarButton";
import { AppScreenProps, BottomTabParamsList } from "@/typings/navigation";
import { BookIcon, ExploreIcon, SearchIcon } from "./icons";
import Routes from "./Routes";
import { ExploreScreen, SearchScreen, SettingsScreen } from "@/screens";
import TopTabNavigator from "./TopTabNavigator";
import SettingsIcon from "./icons/Settings";

const exploreTabBarButton = (props: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Explore"
    focused={props["aria-selected"]}
    icon={ExploreIcon}
    onPress={props.onPress}
  />
);

const searchTabBarButton = (props: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Search"
    focused={props["aria-selected"]}
    icon={SearchIcon}
    onPress={props.onPress}
  />
);

const renderLeanTabBarButton = ({
  onPress,
  ...rest
}: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Learn"
    focused={rest["aria-selected"]}
    icon={BookIcon}
    onPress={onPress}
  />
);

const renderSettingsTabBarButton = (props: BottomTabBarButtonProps) => (
  <TabBarButton
    title="Settings"
    focused={props["aria-selected"]}
    icon={SettingsIcon}
    onPress={props.onPress}
  />
);

const screenOptions: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
  animation: "shift",
};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const BottomNavigator = (_: AppScreenProps<"Dashboard">) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={Routes.Explore}
        getComponent={() => ExploreScreen}
        options={{ tabBarButton: exploreTabBarButton }}
      />
      <Tab.Screen
        name={Routes.Search}
        getComponent={() => SearchScreen}
        options={{ tabBarButton: searchTabBarButton }}
      />
      <Tab.Screen
        name={Routes.Learn}
        getComponent={() => TopTabNavigator}
        options={{
          tabBarButton: renderLeanTabBarButton,
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        getComponent={() => SettingsScreen}
        options={{
          tabBarButton: renderSettingsTabBarButton,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
