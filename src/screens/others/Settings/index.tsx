import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getCurrentUserInfoApi} from '@/apis/userApis';
import {useTheme} from '@react-navigation/native';
import {useAuth} from '@/hooks';
import {AppStackParamsList, AppStackScreensProps} from '@/types/navigation';
import {SVGsNames} from '@/types/common';
import Routes from '@/router/routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {randomUserImage} from '@/types/constant';
import {SettingItem} from '@/components';
import {fonts} from '@/styles';

const settingsListItems: Array<{
  title: string;
  icon: SVGsNames;
  isDelete?: boolean;
  hideArrow?: boolean;
  isLogout?: boolean;

  routeName?: keyof AppStackParamsList;
}> = [
  {
    title: 'Profile',
    icon: 'Profile',
    routeName: Routes.UserProfile,
  },
  {
    title: 'Notifications',
    icon: 'Notification',
  },

  {
    title: 'Download Settings',
    icon: 'Download',
  },
  {
    title: 'Change Language',
    icon: 'Globe',
  },
  {
    title: 'Privacy Policy',
    icon: 'Lock',
  },
  {
    title: 'Terms and Conditions',
    icon: 'DocumentCheck',
  },

  {
    title: 'Report a Bug',
    icon: 'WarningCircle',
  },
  {
    title: 'Send Feedback',
    icon: 'Comment',
  },
  {
    title: 'Delete Account',
    icon: 'Trash',
    isDelete: true,
    hideArrow: true,
  },
  {
    title: 'Logout',
    icon: 'Logout',
    isLogout: true,
    hideArrow: true,
  },
];
const Setting = ({navigation}: AppStackScreensProps<'Setting'>) => {
  const {data: user} = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserInfoApi,
    select: ({data}) => data.data,
    enabled: false,
  });
  console.log(user);
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
      navigation.navigate('UserProfile');
      return;
    }
  };
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, {backgroundColor: colors.neutral10}]}>
      {/* <View>
        <Pressable style={styles.back}>
          <Chevron />
        </Pressable>
        <Text style={[styles.appBarTitle, {color: colors.neutral90}]}>
          Settings
        </Text>
      </View> */}
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
              source={{uri: randomUserImage}}
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
    paddingTop: 18,
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
