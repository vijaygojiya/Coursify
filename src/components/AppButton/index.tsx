import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import {useTheme} from '@react-navigation/native';

interface AppButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const AppButton: FC<AppButtonProps> = ({
  title = '',
  isLoading = false,
  disabled,
  containerStyle = {},
  titleStyle = {},

  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <Pressable
      disabled={disabled || isLoading}
      {...rest}
      style={[
        styles.container,
        {backgroundColor: disabled ? colors.neutral50 : colors.primary},
        containerStyle,
      ]}>
      {isLoading ? (
        <ActivityIndicator size={18} color={colors.neutral10} />
      ) : (
        <Text style={[styles.title, {color: colors.neutral10}, titleStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;
