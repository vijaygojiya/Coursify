import { FlatList, FlatListProps, Text, View } from "react-native";
import React, { useRef } from "react";

import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { textStyles } from "@/styles";
import { ChevronIcon } from "@/assets";
import { Pressable, PressableProps } from "react-native-gesture-handler";

interface HorizontalListSectionProps<T> extends Omit<
  FlatListProps<T>,
  "ref" | "horizontal" | "showsHorizontalScrollIndicator"
> {
  title: string;
  onChevronPress?: PressableProps["onPress"];
}

const HorizontalListSection = <T,>({
  title,
  contentContainerStyle,
  onChevronPress,
  ...props
}: HorizontalListSectionProps<T>) => {
  const listRef = useRef<FlatList | null>(null);
  const { colors } = useTheme();
  const handleScrollToTop = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  };

  return (
    <View>
      <View style={styles.listHeaderContainer}>
        <Pressable
          style={styles.titleContainer}
          onPress={handleScrollToTop}
          hitSlop={5}
        >
          <Text style={[textStyles.titleLarge, { color: colors.neutral100 }]}>
            {title}
          </Text>
        </Pressable>
        <Pressable
          onPress={onChevronPress}
          hitSlop={{ left: 10, right: 10, top: 3, bottom: 3 }}
          style={styles.seeAllContainer}
        >
          <Text style={[textStyles.labelSmall, { color: colors.neutral90 }]}>
            See All
          </Text>
          <ChevronIcon
            style={{ transform: [{ scale: -1 }] }}
            stroke={colors.neutral90}
            strokeWidth={2}
            height={28}
            width={28}
          />
        </Pressable>
      </View>
      <FlatList
        ref={listRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer, contentContainerStyle]}
        {...props}
      />
    </View>
  );
};

export default HorizontalListSection;
