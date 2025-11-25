import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { useCurrentUser } from "@/hooks";
import { AppButton, AppTextInput } from "@/components";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { AppScreenProps } from "@/typings/navigation";
import { EditIcon } from "@/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { uploadAvatarSimple } from "@/services/supabase/storageServices";
import { updateProfile, UserProfile } from "@/services/supabase";

const EditProfile = ({ navigation }: AppScreenProps<"EditProfile">) => {
  const { data: user } = useCurrentUser({ enabled: false });

  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [profilePic, setProfilePic] = useState(user?.avatar_url);
  const [imageResult, setImgResult] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const isOpeningGallery = useRef(false);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onMutate: async (newProfile, ctx) => {
      // optimistic update

      await ctx.client.cancelQueries({ queryKey: [newProfile.id, "profile"] });
      const previous = ctx.client.getQueryData<UserProfile | null>([
        newProfile.id,
        "profile",
      ]);
      ctx.client.setQueryData([newProfile.id, "profile"], (old: any) => ({
        ...(old ?? {}),
        ...newProfile,
      }));
      return { previous };
    },
    onError: (_, x, old, ctx) => {
      if (old?.previous) {
        ctx.client.setQueryData([x.id, "profile"], old.previous);
      }
    },
    onSettled: (res, err, variables, _, ctx) => {
      ctx.client.invalidateQueries({ queryKey: [variables.id, "profile"] });
      navigation.goBack();
    },
  });

  const { colors } = useTheme();

  const handelEditProfilePic = async () => {
    if (isOpeningGallery.current) {
      return;
    }
    isOpeningGallery.current = true;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        exif: false,
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
        selectionLimit: 1,
        legacy: true,
        preferredAssetRepresentationMode:
          ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Automatic,
      });
      if (result.assets) {
        let image = result.assets[0];
        console.log("====>>>>", JSON.stringify(image, null, 8));
        setImgResult(image);
        setProfilePic(image.uri);
      }
      // const items = await openPicker({ aspect: [1, 1] });

      // if (!image) return;

      // image = await openCropper({
      //   imageUri: image.path,
      //   shape: "circle",
      //   aspectRatio: 1 / 1,
      // });

      // if (!result.canceled) {
      //   setProfilePic(result.assets[0].uri);
      // }
    } catch (error: unknown) {
      console.log("error while open image crop picker", error);
    } finally {
      isOpeningGallery.current = false;
    }
  };
  const updateProfileData = async () => {
    if (!user) {
      return;
    }
    if (imageResult) {
      //
      const res = await uploadAvatarSimple(user.id, imageResult);
      mutate({
        id: user.id,
        name,
        bio,
        avatar_url: res,
      });
    } else {
      // update profile
    }
    mutate({
      id: user.id,
      name,
      bio,
    });
    // mutate({ data: { name: name, profileImg: profilePic ?? "", bio: bio } });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.neutral10 },
      ]}
    >
      <View>
        <Pressable style={styles.profileContainer}>
          <Image
            source={{ uri: profilePic }}
            style={[styles.profile, { backgroundColor: colors.neutral60 }]}
          />
          <Pressable
            onPress={handelEditProfilePic}
            style={[
              styles.editContainer,
              {
                backgroundColor: colors.primaryMain,
              },
            ]}
          >
            <EditIcon stroke={colors.neutral10} height={20} width={20} />
          </Pressable>
        </Pressable>
        <AppTextInput
          label={"Name"}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <AppTextInput
          label={"Bio"}
          value={bio}
          placeholder="Enter about you"
          onChangeText={setBio}
          maxLength={56}
          multiline={true}
          textAlignVertical="top"
          style={{ height: 72 }}
        />
      </View>
      <AppButton
        title="Update"
        onPress={updateProfileData}
        isLoading={isPending}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22, paddingVertical: 18 },
  profileContainer: { alignSelf: "center", marginBottom: 12 },
  profile: {
    height: 116,
    width: 116,
    borderRadius: 116 / 2,
    alignSelf: "center",
  },
  editContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
    borderRadius: 22,
  },
});
