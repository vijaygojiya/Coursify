import React, {useCallback} from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Routes from './routes';
import {ExploreScreen, LearnScreen, SearchScreen} from '@/screens';
import {AppStackScreensProps, TabParamList} from '@/types/navigation';
import {Pressable} from 'react-native';
import {BookIcon, ExploreIcon, SearchIcon} from '@/screens/tabs/icons';
import {TabBarButton} from './TabBarButton';
import styles from './styles';
import {Setting} from '@/assets';
import {useTheme} from '@react-navigation/native';

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

const TabNavigator = ({navigation}: AppStackScreensProps<'TabNavigator'>) => {
  const {colors} = useTheme();

  const headerRightIcon = useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(Routes.Setting);
        }}>
        <Setting stroke={colors.neutral10} />
      </Pressable>
    );
  }, [colors.neutral10, navigation]);

  const getScreenOptions = useCallback((): BottomTabNavigationOptions => {
    return {
      lazy: true,
      headerStyle: {backgroundColor: colors.primaryMain},
      headerRightContainerStyle: styles.headerLeftIconContainer,
      headerTitleStyle: [styles.title, {color: colors.neutral10}],
      tabBarStyle: [styles.tabBarStyle, {borderTopColor: colors.neutral10}],
      headerTitleAlign: 'center',
      tabBarActiveTintColor: colors.primaryMain,
      headerRight: headerRightIcon,
    };
  }, [colors.neutral10, colors.primaryMain, headerRightIcon]);

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
  );
};

export default TabNavigator;
