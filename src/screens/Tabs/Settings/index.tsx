import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullScreenLoader, SettingHeader, SettingItem } from "@/components";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BottomTabScreensProps } from "@/typings/navigation";
import { signOut } from "@/services/supabase";
import { AppFonts } from "@/styles";
import { SVGsNames } from "@/typings/common";
import { storage } from "@/utils/persister";

const settingsListItems: {
  title: string;
  icon: SVGsNames;
  isLogout?: boolean;
  isDelete?: boolean;
  hideArrow?: boolean;
}[] = [
  {
    title: "Notifications",
    icon: "NotificationIcon",
  },

  {
    title: "Download Settings",
    icon: "DownloadIcon",
  },
  {
    title: "Change Language",
    icon: "GlobeIcon",
  },
  {
    title: "Privacy Policy",
    icon: "Lock2Icon",
  },
  {
    title: "Terms and Conditions",
    icon: "DocCheckIcon",
  },

  {
    title: "Report a Bug",
    icon: "WarningCircleIcon",
  },
  {
    title: "Send Feedback",
    icon: "CommentIcon",
  },
  {
    title: "Delete Account",
    icon: "TrashIcon",
    isDelete: true,
    hideArrow: true,
  },
  {
    title: "Logout",
    icon: "LogoutIcon",
    isLogout: true,
    hideArrow: true,
  },
];

const Setting = (_: BottomTabScreensProps<"Settings">) => {
  const { top } = useSafeAreaInsets();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      //TO:DO
      return Promise.resolve(true);
    },
    onSuccess: () => {
      // deleteCurrentUser();
      queryClient.removeQueries();
      storage.clearAll();
    },
  });

  const { colors } = useTheme();
  const queryClient = useQueryClient();

  const onSettingItemPress = ({
    isDelete,
    isLogout,
  }: (typeof settingsListItems)[number]) => {
    if (isLogout) {
      Alert.alert("", "Are you sure want to logout!", [
        {
          text: "Yes",
          onPress: () => {
            signOut();
            queryClient.removeQueries();
            storage.clearAll();
          },
        },
        { text: "No" },
      ]);
      return;
    }
    if (isDelete) {
      Alert.alert("", "Are you sure want to delete your account!", [
        {
          text: "Yes",
          onPress: () => {
            mutate();
          },
        },
        { text: "No" },
      ]);
      return;
    }
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.neutral10, paddingTop: top },
      ]}
    >
      <SettingHeader />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={settingsListItems}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
          <Text style={[styles.appVersion, { color: colors.neutral70 }]}>
            App Version 1.0.0
          </Text>
        }
        renderItem={({ item, index }) => {
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
    </View>
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
  },

  appVersion: {
    marginTop: 48,
    fontFamily: AppFonts.regular,
    fontSize: 12,
    alignSelf: "center",
  },
});
