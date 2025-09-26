import { ChevronIcon } from "@/assets";
import { textStyles } from "@/styles";
import { AppScreenProps } from "@/typings/navigation";
import { ICourse } from "@/typings/types";
import { useTheme } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWith = Dimensions.get("screen").width;
const staticCourse: ICourse = {
  id: "as-asd-d-34-3s",
  title: "React Native Masterclass",
  thumbnail:
    "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  description:
    "Build awesome mobile app for multiple platforms using React Native",
  instructor: {
    firebaseId: "23",
    name: "Vijay Gojiya",
    role: "instructor",
    profile:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixfirebaseId=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  category: "react-native",
  tags: [],
  price: 34,
  rating: 4.5,
  totalDuration: 334343,
  modules: [],
  reviews: [],
};

const CourseDetailScreen = ({ navigation }: AppScreenProps<"CourseDetail">) => {
  const { title, description, thumbnail, modules, instructor } = staticCourse;

  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const renderListHeader = useCallback(() => {
    return (
      <>
        <ImageBackground
          blurRadius={18}
          style={[styles.thumbnailBgImg, { backgroundColor: colors.neutral40 }]}
          source={{ uri: thumbnail }}
        >
          <LinearGradient
            locations={[0.5, 1]}
            colors={[colors.transparent, colors.gradientBlack[1]]}
            style={[styles.linearGradient, { paddingTop: top }]}
          >
            <Pressable onPress={navigation.goBack}>
              <ChevronIcon stroke={colors.neutral10} />
            </Pressable>
            <Image source={{ uri: thumbnail }} style={styles.thumbnailImg} />
            <View>
              <Text
                numberOfLines={2}
                style={[textStyles.headlineLarge, { color: colors.neutral10 }]}
              >
                {title}
              </Text>
              <Text
                numberOfLines={2}
                style={[textStyles.headlineSmall, { color: colors.neutral40 }]}
              >
                {description}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.instructorInfoContainer}>
          <Image
            style={[
              styles.instructorProfile,
              {
                backgroundColor: colors.neutral70,
              },
            ]}
            source={{ uri: instructor.profileImg }}
          />
          <View>
            <Text
              style={[textStyles.headlineSmall, { color: colors.neutral70 }]}
            >
              Instructor
            </Text>
            <Text style={[textStyles.bodyMedium, { color: colors.neutral80 }]}>
              {instructor.name}
            </Text>
          </View>

          {/* 2h 35m · 30 lessons 2h 35m · 30 lessons 4.6 6577 people completed
          Published 7 years ago | Updated 4 years ago */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 2,
            marginHorizontal: 12,
            marginVertical: 8,
          }}
        >
          {/* <Clock /> */}
          <Text style={[textStyles.bodySmall, { color: colors.neutral80 }]}>
            2h 35m · 30 lessons
          </Text>
        </View>
      </>
    );
  }, [
    colors.neutral40,
    colors.transparent,
    colors.gradientBlack,
    colors.neutral10,
    colors.neutral70,
    colors.neutral80,
    thumbnail,
    top,
    navigation?.goBack,
    title,
    description,
    instructor.profileImg,
    instructor.name,
  ]);

  return (
    <FlatList
      data={modules}
      overScrollMode="never"
      bounces={false}
      keyExtractor={(i) => i.id}
      ListHeaderComponent={renderListHeader}
      renderItem={() => {
        return <View />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  thumbnailBgImg: {
    width: screenWith,
    height: screenWith * 1.012,
  },
  thumbnailImg: {
    alignSelf: "center",
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    marginTop: 14,
    marginBottom: 12,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 18,
  },
  instructorInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    marginTop: 8,
    marginHorizontal: 8,
  },
  instructorProfile: { height: 40, width: 40, borderRadius: 20 },
});

export default CourseDetailScreen;
