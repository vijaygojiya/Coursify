import {Pressable, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {SVGsNames} from '@/types/common';
import * as SVGs from '@/assets';

interface SettingItemProps {
  title: string;
  icon: SVGsNames;
  isDelete?: boolean;
  onPress: () => void;
  hideArrow?: boolean;
}

const SettingItem = ({
  title,
  icon,
  isDelete = false,
  hideArrow = false,
  onPress,
}: SettingItemProps) => {
  const {colors} = useTheme();
  const Icon = SVGs[icon];
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {borderColor: colors.neutral50}]}>
      <Icon stroke={isDelete ? colors.dangerMain : colors.neutral80} />
      <Text
        style={[
          [
            styles.title,
            {color: isDelete ? colors.dangerMain : colors.neutral90},
          ],
        ]}>
        {title}
      </Text>
      {hideArrow ? null : <SVGs.Chevron style={{transform: [{scaleX: -1}]}} />}
    </Pressable>
  );
};

export default SettingItem;
