import { Pressable } from "react-native";
import React from "react";
import AppTextInput, { AppTextInputProps } from "../AppTextInput";
import { ChevronIcon } from "@/assets";

interface AppInputPlaceholder extends AppTextInputProps {
  onPress?: () => void;
}

const PlaceholderInput = ({ onPress, ...props }: AppInputPlaceholder) => {
  return (
    <Pressable onPress={onPress}>
      <AppTextInput
        {...props}
        editable={false}
        pointerEvents="none"
        rightIcon={
          <ChevronIcon style={[{ transform: [{ rotate: "-90deg" }] }]} />
        }
      />
    </Pressable>
  );
};

export default PlaceholderInput;
