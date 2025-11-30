import { Pressable, StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import { useTheme } from "@react-navigation/native";
import { textStyles } from "@/styles";

interface OptionSheetListItemProps {
  onItemPress: () => void;
  name: string;
}

const OptionSheetListItem = ({
  onItemPress,
  name,
}: OptionSheetListItemProps) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onItemPress} style={styles.listItemContainer}>
      <Text
        style={[
          textStyles.bodyMedium,
          styles.itemTitle,
          { color: colors.neutral100 },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default memo(OptionSheetListItem);

const styles = StyleSheet.create({
  listItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  itemTitle: {
    lineHeight: 18,
    flex: 1,
  },
});
