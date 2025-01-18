import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useCurrentUser} from '@/hooks';
import {AppButton, AppTextInput} from '@/components';
import {useTheme} from '@react-navigation/native';
import {openPicker, Options} from 'react-native-image-crop-picker';
import {useMutation} from '@tanstack/react-query';
import {updateCurrentUserInfoApi} from '@/apis/userApis';
import {AppScreenProps} from '@/typings/navigation';
import {EditIcon} from '@/assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

const EditProfile = ({navigation}: AppScreenProps<'EditProfile'>) => {
  const {data: user, refetch} = useCurrentUser();

  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [profilePic, setProfilePic] = useState(user?.profileImg);

  const {mutate, isPending} = useMutation({
    mutationFn: updateCurrentUserInfoApi,
    onSuccess: () => {
      refetch().then(() => {
        navigation.goBack();
      });
    },
  });

  const {colors} = useTheme();

  const handelEditProfilePic = async () => {
    try {
      const options: Options = {
        mediaType: 'photo',
        width: 500,
        height: 500,
        cropping: true,
        cropperCircleOverlay: true,
        cropperToolbarColor: colors.primaryMain,
        cropperToolbarWidgetColor: colors.neutral10,
        cropperActiveWidgetColor: colors.neutral10,
      };
      const selectedImageAsset = await openPicker(options);
      console.log('selectedImageAsset', selectedImageAsset);
      setProfilePic(selectedImageAsset.path);
    } catch (error: unknown) {
      console.log('error while open image crop picker', error);
    }
  };
  const updateProfileData = () => {
    mutate({name: name, profileImg: profilePic, bio: bio});
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.neutral10},
      ]}>
      <View>
        <Pressable style={styles.profileContainer}>
          <Image
            source={{uri: profilePic}}
            style={[styles.profile, {backgroundColor: colors.neutral60}]}
          />
          <Pressable
            onPress={handelEditProfilePic}
            style={[
              styles.editContainer,
              {
                backgroundColor: colors.primaryMain,
              },
            ]}>
            <EditIcon stroke={colors.neutral10} height={20} width={20} />
          </Pressable>
        </Pressable>
        <AppTextInput
          label={'Name'}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <AppTextInput
          label={'Bio'}
          value={bio}
          placeholder="Enter about you"
          onChangeText={setBio}
          maxLength={56}
          multiline={true}
          style={{height: 68}}
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
  container: {flex: 1, paddingHorizontal: 22, paddingVertical: 18},
  profileContainer: {alignSelf: 'center', marginBottom: 12},
  profile: {
    height: 116,
    width: 116,
    borderRadius: 116 / 2,
    alignSelf: 'center',
  },
  editContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    borderRadius: 22,
  },
});
