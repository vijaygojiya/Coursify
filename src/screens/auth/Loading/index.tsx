import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Loading = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primaryMain} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
