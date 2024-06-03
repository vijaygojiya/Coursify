import {
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {ReactNode, forwardRef, memo} from 'react';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

interface AppTextInputProps extends TextInputProps {
  rightIcon?: ReactNode | null;
  leftIcon?: ReactNode | null;
  label: string;
  onRightIconPress?: PressableProps['onPress'];
  error?: string;
}

const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      label,
      rightIcon = null,
      onRightIconPress,
      leftIcon = null,
      style,
      error = '',
      ...rest
    },
    ref,
  ) => {
    const {colors} = useTheme();
    return (
      <View style={[styles.container]}>
        <Text
          numberOfLines={1}
          style={[styles.labelText, {color: colors.neutral90}]}>
          {label}
        </Text>
        <View style={[styles.rowContainer, {borderColor: colors.infoBorder}]}>
          {leftIcon}
          <TextInput
            ref={ref}
            placeholderTextColor={colors.neutral60}
            cursorColor={colors.primaryMain}
            style={[styles.textInput, {color: colors.neutral100}, style]}
            {...rest}
          />
          <Pressable
            hitSlop={5}
            disabled={!rightIcon}
            onPress={onRightIconPress}>
            {rightIcon}
          </Pressable>
        </View>
        <Text numberOfLines={2} style={styles.error}>
          {error}
        </Text>
      </View>
    );
  },
);

export default memo(AppTextInput);
