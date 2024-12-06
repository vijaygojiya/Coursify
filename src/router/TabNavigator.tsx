import React, {useCallback} from 'react';
import {
  BottomTabBarButtonProps,
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ExploreScreen, SearchScreen} from '@/screens';
import {BookIcon, ExploreIcon, SearchIcon} from '@/screens/tabs/icons';
import {TabBarButton} from './TabBarButton';
import TopTabNavigator from './TopTabNavigator';
import {AppStackScreensProps, TabParamList} from '@/types/navigation';
import Routes from './routes';
import {useTheme} from '@react-navigation/native';
import {useCurrentUser} from '@/hooks';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import BounceContainer from '@/components/BounceContainer';
import {Setting} from '@/assets';
import {LineSeparator} from '@/components';

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

const BottomNavigator = ({
  navigation,
}: AppStackScreensProps<'TabNavigator'>) => {
  const {colors} = useTheme();
  const {data: user} = useCurrentUser();
  const renderCustomHeader = useCallback(() => {
    return (
      <SafeAreaView
        edges={['top', 'right', 'left']}
        style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: user?.profileImg}}
            style={[styles.profileImage, {backgroundColor: colors.neutral50}]}
          />
          <View style={styles.infoContainer}>
            <Text style={[styles.text, {color: colors.neutral100}]}>
              {user?.name}
            </Text>
            <Text style={[styles.email, {color: colors.neutral70}]}>
              {user?.email}
            </Text>
          </View>
          <BounceContainer
            onPress={() => {
              navigation.navigate(Routes.Setting);
            }}>
            <Setting />
          </BounceContainer>
        </View>
        <Text numberOfLines={3} style={[styles.bio, {color: colors.neutral80}]}>
          {user?.bio}
        </Text>
        {/* <LineSeparator /> */}
      </SafeAreaView>
    );
  }, [
    colors.neutral100,
    colors.neutral50,
    colors.neutral70,
    colors.neutral80,
    user?.bio,
    user?.email,
    user?.name,
    user?.profileImg,
    navigation,
  ]);

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
        options={{
          tabBarButton: renderLeanTabBarButton,
          headerShown: true,
          header: renderCustomHeader,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
