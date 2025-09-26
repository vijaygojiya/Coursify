import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

interface Props {
  loading: boolean;
}

const FullScreenLoader = ({loading = false}: Props) => {
  const {colors} = useTheme();
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={loading}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.transparent70,
          },
        ]}>
        <ActivityIndicator
          style={[
            styles.loader,
            {
              backgroundColor: colors.neutral10,
            },
          ]}
          size="large"
          color={colors.primaryMain}
        />
      </View>
    </Modal>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    paddingHorizontal: 34,
    paddingTop: 34,
    paddingBottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
});
