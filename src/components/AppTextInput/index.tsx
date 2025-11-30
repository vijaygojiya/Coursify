import {
  Pressable,
  PressableProps,
  Text,
  type TextInputProps,
  View,
} from "react-native";
import React, { ReactNode, forwardRef, memo } from "react";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

export interface AppTextInputProps extends TextInputProps {
  rightIcon?: ReactNode | null;
  leftIcon?: ReactNode | null;
  label: string;
  onRightIconPress?: PressableProps["onPress"];
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
      error = "",
      ...rest
    },
    ref,
  ) => {
    const { colors } = useTheme();
    return (
      <View style={[styles.container]}>
        <Text
          numberOfLines={1}
          style={[styles.labelText, { color: colors.neutral80 }]}
        >
          {label}
        </Text>
        <View style={[styles.rowContainer, { borderColor: colors.border }]}>
          {leftIcon}
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            ref={ref}
            placeholderTextColor={colors.neutral60}
            cursorColor={colors.primary}
            // underlineColorAndroid={colors.primary}
            selectionColor={colors.primary}
            style={[styles.textInput, { color: colors.neutral90 }, style]}
            {...rest}
          />
          <Pressable
            hitSlop={5}
            disabled={!rightIcon}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </Pressable>
        </View>
        <Text
          numberOfLines={2}
          style={[styles.error, { color: colors.dangerMain }]}
        >
          {error}
        </Text>
      </View>
    );
  },
);
AppTextInput.displayName = "AppTextInput";

export default memo(AppTextInput);
