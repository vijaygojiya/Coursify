import React from "react";
import { ColorValue, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

export const ActionButton = ({
  color,
  pressHandler,
  bgColor,
  icon,
  style,
  size = 24,
}: {
  icon: React.FC<SvgProps>;
  color: ColorValue;
  pressHandler: () => void;
  bgColor: ColorValue;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const IconSvg = icon;
  return (
    <RectButton
      style={[styles.rightAction, { backgroundColor: bgColor }, style]}
      onPress={pressHandler}
    >
      <IconSvg height={size} width={size} stroke={color} strokeWidth={1.5} />
    </RectButton>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  rightAction: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: "100%",
  },
});
