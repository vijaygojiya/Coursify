import * as React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useTheme} from '@react-navigation/native';

const Divider = () => {
  const {colors} = useTheme();
  return (
    <View style={[styles.divider, {borderBlockColor: colors.infoBorder}]} />
  );
};

export default Divider;
