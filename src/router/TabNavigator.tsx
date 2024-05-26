import React, {createContext, useCallback, useMemo} from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Routes from './routes';
import {ExploreScreen, LearnScreen, SearchScreen} from '@/screens';
import {TabParamList} from '@/types/navigation';
import {Pressable} from 'react-native';
import {BookIcon, ExploreIcon, SearchIcon} from '@/screens/tabs/icons';
import {TabBarButton} from './TabBarButton';
import styles from './styles';
import {Menu} from '@/assets';
import {useTheme} from '@react-navigation/native';
import {Drawer} from 'react-native-drawer-layout';
import {DrawerContent} from '@/components';

const renderDrawerContent = () => {
  return <DrawerContent />;
};

export const DrawerContext = createContext({
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

const Tab = createBottomTabNavigator<TabParamList>();

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

const TabNavigator = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const contextValue = useMemo(() => {
    return {
      isDrawerOpen: open,
      toggleDrawer,
    };
  }, [open, toggleDrawer]);
  const {colors} = useTheme();

  const headerLeftIcon = useCallback(() => {
    return (
      <Pressable onPress={toggleDrawer}>
        <Menu />
      </Pressable>
    );
  }, [toggleDrawer]);

  const getScreenOptions = useCallback((): BottomTabNavigationOptions => {
    return {
      lazy: true,
      headerStyle: {backgroundColor: colors.primaryMain},
      headerLeftContainerStyle: styles.headerLeftIconContainer,
      headerTitleStyle: [styles.title, {color: colors.neutral10}],
      tabBarStyle: [styles.tabBarStyle, {borderTopColor: colors.neutral10}],
      headerTitleAlign: 'center',
      tabBarActiveTintColor: colors.primaryMain,
      headerLeft: headerLeftIcon,
    };
  }, [colors.neutral10, colors.primaryMain, headerLeftIcon]);
  return (
    <Drawer
      drawerStyle={{
        backgroundColor: colors.primaryMain,
      }}
      drawerType="front"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={renderDrawerContent}>
      <DrawerContext.Provider value={contextValue}>
        <Tab.Navigator screenOptions={getScreenOptions}>
          <Tab.Screen
            name={Routes.Explore}
            component={ExploreScreen}
            options={{tabBarButton: exploreTabBarButton}}
          />
          <Tab.Screen
            name={Routes.Search}
            component={SearchScreen}
            options={{
              tabBarButton: searchTabBarButton,
            }}
          />
          <Tab.Screen
            name={Routes.Learn}
            component={LearnScreen}
            options={{
              tabBarButton: renderLeanTabBarButton,
            }}
          />
        </Tab.Navigator>
      </DrawerContext.Provider>
    </Drawer>
  );
};

export default TabNavigator;
