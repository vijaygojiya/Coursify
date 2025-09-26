import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {textStyles} from '@/styles';
import {CrossIcon} from '@/assets';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

const AppSheetHandleComponent = ({title = ''}: {title: string}) => {
  const {colors} = useTheme();
  const {dismiss} = useBottomSheetModal();

  return (
    <View style={styles.customHandleContainer}>
      <View
        style={[styles.customHandle, {backgroundColor: colors.neutral40}]}
      />

      <View style={styles.rowContainer}>
        <Text
          style={[textStyles.titleMedium, styles.title, {color: colors.back}]}>
          {title}
        </Text>
        <Pressable
          onPress={() => {
            dismiss();
          }}>
          <CrossIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default AppSheetHandleComponent;

const styles = StyleSheet.create({
  customHandleContainer: {
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  customHandle: {
    height: 4,
    width: 44,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },

  title: {
    flex: 1,
  },
});
