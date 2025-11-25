import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppFonts } from "@/styles";
import { useCurrentUser } from "@/hooks";
import { useNavigation, useTheme } from "@react-navigation/native";
import { EditIcon } from "@/assets";
import { AppRoutes } from "@/navigation";
import { BottomTabScreensProps } from "@/typings/navigation";

const SettingHeader = () => {
  const { data: user } = useCurrentUser({ enabled: false });
  const { colors } = useTheme();
  const navigation =
    useNavigation<BottomTabScreensProps<"Settings">["navigation"]>();

  return (
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: user?.avatar_url }}
        style={[styles.profileImage, { backgroundColor: colors.neutral50 }]}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.text, { color: colors.neutral100 }]}>
          {user?.name}
        </Text>
        <Text style={[styles.email, { color: colors.neutral70 }]}>
          {user?.email}
        </Text>
      </View>
      <Pressable
        hitSlop={5}
        onPress={() => {
          navigation.navigate(AppRoutes.EditProfile);
        }}
      >
        <EditIcon stroke={colors.neutral60} />
      </Pressable>
    </View>
  );
};

export default SettingHeader;

const styles = StyleSheet.create({
  profileContainer: {
    columnGap: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 12,
    marginTop: 12,
  },
  infoContainer: { flex: 1 },
  profileImage: {
    height: 74,
    width: 74,
    borderRadius: 74 / 2,
  },

  text: {
    fontFamily: AppFonts.medium,
    fontSize: 18,
  },
  email: {
    fontFamily: AppFonts.regular,
    fontSize: 12,
  },
  bio: {
    fontFamily: AppFonts.medium,
    fontSize: 14,
    paddingVertical: 8,
  },
});
