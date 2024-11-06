import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, forwardRef, memo} from 'react';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

interface AppTextInputProps extends TextInputProps {
  rightIcon?: ReactNode | null;
  leftIcon?: ReactNode | null;
  label: string;
  onRightIconPress?: PressableProps['onPress'];
  containerStyle?: StyleProp<ViewStyle>;
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
      containerStyle = {},
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
        <View
          style={[
            styles.rowContainer,
            {borderColor: colors.infoBorder},
            containerStyle,
          ]}>
          {leftIcon}
          <TextInput
            ref={ref}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={colors.neutral60}
            cursorColor={colors.primaryMain}
            style={[styles.textInput, {color: colors.neutral90}, style]}
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
