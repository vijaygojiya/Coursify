import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useAuth, useCurrentUser} from '@/hooks';
import Routes from '@/router/routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FullScreenLoader, SettingItem} from '@/components';
import {fonts} from '@/styles';
import {AppStackScreensProps} from '@/types/navigation';
import {useMutation} from '@tanstack/react-query';
import {deleteUser} from '@/apis/userApis';

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

const Setting = ({navigation}: AppStackScreensProps<'Setting'>) => {
  const {mutate, isPending} = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logOut();
    },
  });

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
        {
          text: 'Yes',
          onPress: () => {
            mutate();
          },
        },
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
      <FullScreenLoader loading={isPending} />
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 22,
    // backgroundColor: 'red',
  },

  appVersion: {
    marginTop: 48,
    fontFamily: fonts.regular,
    fontSize: 12,
    alignSelf: 'center',
  },
});
