import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
const ScreenContainer = ({children, style, ...rest}: ViewProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: colors.neutral10}, style]}
      {...rest}>
      {children}
    </View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
