import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";

interface AppButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  isOutlined?: boolean;
}

const AppButton: FC<AppButtonProps> = ({
  title = "",
  isLoading = false,
  disabled,
  containerStyle = {},
  titleStyle = {},
  isOutlined = false,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      disabled={disabled || isLoading}
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.neutral50 : colors.primary,
          borderColor: colors.primary,
        },
        isOutlined ? styles.outlineContainer : {},
        containerStyle,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size={20}
          color={isOutlined ? colors.primary : colors.neutral10}
        />
      ) : (
        <Text
          style={[
            styles.title,
            { color: isOutlined ? colors.primary : colors.neutral10 },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;
