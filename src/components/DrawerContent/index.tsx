import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Logout} from '@/assets';
import {useTheme} from '@react-navigation/native';
import {randomUserImage} from '@/types/constant';

const DrawerContent = () => {
  const {colors} = useTheme();

  const onLogoutPress = () => {
    // signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: randomUserImage}}
          style={[styles.profileImage, {backgroundColor: colors.neutral50}]}
        />
        <Text style={[styles.text, {color: colors.neutral10}]}>
          Vijay Gojiya
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentSpacer} />
        <Pressable onPress={onLogoutPress} style={styles.logoutButton}>
          <Logout />
          <Text style={styles.text}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginVertical: 18,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  contentSpacer: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3,
  },
  text: {
    marginHorizontal: 8,
  },
});

export default DrawerContent;
