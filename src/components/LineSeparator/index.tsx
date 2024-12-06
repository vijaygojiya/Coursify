import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const LineSeparator = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.line, {backgroundColor: colors.infoBorder}]} />
    </View>
  );
};

export default LineSeparator;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  line: {flex: 1, height: StyleSheet.hairlineWidth},
});
