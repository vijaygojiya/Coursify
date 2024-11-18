import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAuth, useCurrentUser} from '@/hooks';
import Routes from '@/router/routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SettingItem} from '@/components';
import {fonts} from '@/styles';
import {AppStackScreensProps} from '@/types/navigation';

const settingsListItems = [
  {
    title: 'Profile',
    icon: 'Profile' as const,
    routeName: Routes.EditProfile,
  },
  {
    title: 'Notifications',
    icon: 'Notification' as const,
  },

  {
    title: 'Download Settings',
    icon: 'Download' as const,
  },
  {
    title: 'Change Language',
    icon: 'Globe' as const,
  },
  {
    title: 'Privacy Policy',
    icon: 'Lock' as const,
  },
  {
    title: 'Terms and Conditions',
    icon: 'DocumentCheck' as const,
  },

  {
    title: 'Report a Bug',
    icon: 'WarningCircle' as const,
  },
  {
    title: 'Send Feedback',
    icon: 'Comment' as const,
  },
  {
    title: 'Delete Account',
    icon: 'Trash' as const,
    isDelete: true,
    hideArrow: true,
  },
  {
    title: 'Logout',
    icon: 'Logout' as const,
    isLogout: true,
    hideArrow: true,
  },
];

const Setting = ({}: AppStackScreensProps<'Setting'>) => {
  const {data: user} = useCurrentUser();
  const navigation = useNavigation();

  const {colors} = useTheme();
  const {logOut} = useAuth();

  const onSettingItemPress = ({
    isDelete,
    isLogout,
    routeName,
  }: (typeof settingsListItems)[number]) => {
    if (isLogout) {
      Alert.alert('', 'Are you sure want to logout!', [
        {text: 'Yes', onPress: logOut},
        {text: 'No'},
      ]);
      return;
    }
    if (isDelete) {
      Alert.alert('', 'Are you sure want to delete your account!', [
        {text: 'Yes', onPress: logOut},
        {text: 'No'},
      ]);
      return;
    }
    if (routeName) {
      navigation.navigate(routeName);
      return;
    }
  };
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, {backgroundColor: colors.neutral10}]}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={settingsListItems}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
          <Text style={[styles.appVersion, {color: colors.neutral70}]}>
            App Version 1.0.0
          </Text>
        }
        ListHeaderComponent={
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
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <SettingItem
              key={`${item.title}-${index}`}
              {...item}
              onPress={() => {
                onSettingItemPress(item);
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBarTitle: {
    fontFamily: fonts.medium,
    fontSize: 24,
    textAlign: 'center',
  },
  profileContainer: {
    marginVertical: 8,
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {flex: 1},
  profileImage: {
    height: 54,
    width: 54,
    borderRadius: 54 / 2,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 22,
  },

  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },
  email: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },

  appVersion: {
    marginTop: 48,
    fontFamily: fonts.regular,
    fontSize: 12,
    alignSelf: 'center',
  },
});
