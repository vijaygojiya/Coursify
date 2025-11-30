import { FlatList, ListRenderItem } from "react-native";
import React, { useCallback, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabScreensProps } from "@/typings/navigation";
import styles from "./styles";
import { CategoryItem, SearchPlaceholder } from "@/components";
import { AppRoutes } from "@/navigation";

const courseCategories = [
  "AI & Machine Learning",
  "Data Science",
  "Web Development",
  "Mobile App Development",
  "Content Creation",
  "Social Media Marketing",
  "Photography & Video",
  "Video Editing, VFX, Motion",
  "Graphic Design, UI/UX",
  "Digital Marketing",
];

const getKeyIndex = (item: string, index: number) => `${item}-${index}`;

const Search = ({ navigation }: BottomTabScreensProps<"Search">) => {
  const listRef = useRef<FlatList | null>(null);
  useScrollToTop(listRef);
  const { top } = useSafeAreaInsets();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      return (
        <CategoryItem
          title={item}
          onPress={() => {
            navigation.navigate(AppRoutes.CourseList, { type: item });
          }}
        />
      );
    },
    [navigation],
  );

  return (
    <FlatList
      ref={listRef}
      numColumns={2}
      data={courseCategories}
      renderItem={renderItem}
      ListHeaderComponent={<SearchPlaceholder />}
      keyExtractor={getKeyIndex}
      bounces={false}
      overScrollMode="never"
      contentContainerStyle={[styles.contentContainer, { paddingTop: top + 8 }]}
      columnWrapperStyle={styles.columnContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Search;
