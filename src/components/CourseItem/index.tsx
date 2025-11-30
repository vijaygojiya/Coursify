import { Image, Pressable, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { MockData } from "@/utils/dummy";
import { useTheme } from "@react-navigation/native";
import { randomCourseImage } from "@/utils/constant";
import { textStyles } from "@/styles";

type IItem = (typeof MockData)["Newest Courses"][number];

type CourseItemProps = IItem;
const CourseItem = ({ instructor, title }: CourseItemProps) => {
  const { colors } = useTheme();
  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.neutral10 }]}
    >
      <Image
        source={{ uri: randomCourseImage }}
        style={[styles.img, { backgroundColor: colors.primaryBorder }]}
      />
      <Text style={[textStyles.titleMedium, { color: colors.neutral100 }]}>
        {title}
      </Text>
      <Text style={[textStyles.labelSmall, { color: colors.neutral80 }]}>
        {instructor.name}
      </Text>
    </Pressable>
  );
};

export default CourseItem;
