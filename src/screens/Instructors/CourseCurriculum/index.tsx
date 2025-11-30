import React, { useCallback, useRef } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Collapsible } from "react-native-fast-collapsible";

// import { CreateNewCourseStackScreenProps } from "@/typings/navigation";
import {
  ActionButton,
  AnimatedChevron,
  AppButton,
  LessonBottomSheet,
} from "@/components";
import { EditIcon, PlusCircleIcon, TrashIcon } from "@/assets";
import { textStyles } from "@/styles";
import { formatTime } from "@/utils";
import { LessonBottomSheetRef } from "@/components/LessonBottomSheet";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { useCreateCourseState } from "@/contexts/CreateCourseContext";
import type { ImagePickerAsset } from "expo-image-picker";

export interface ILocalLesson {
  id: string;
  title: string;
  video: ImagePickerAsset;
}

export interface ILocalModule {
  id: string;
  title: string;
  collapsed: boolean;
  lessons: ILocalLesson[];
}

const LessonListItem = ({
  video,
  title,
  onEditPress,
  onDeletePress,
}: {
  title: string;
  video: ImagePickerAsset;
  onEditPress: () => void;
  onDeletePress: () => void;
}) => {
  const { colors } = useTheme();
  const updateRef = useRef<SwipeableMethods | null>(null);
  const renderRightActions = useCallback(() => {
    return (
      <View
        style={{
          width: 24 * 4,
          marginEnd: 8,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderTopEndRadius: 8,
          borderBottomEndRadius: 8,
          overflow: "hidden",
        }}
      >
        <ActionButton
          icon={TrashIcon}
          color={colors.neutral10}
          pressHandler={() => {
            onDeletePress();
            updateRef.current?.close();
          }}
          bgColor={colors.dangerMain}
        />
        <ActionButton
          icon={EditIcon}
          color={colors.neutral10}
          pressHandler={() => {
            onEditPress();
            updateRef.current?.close();
          }}
          bgColor={colors.warningMain}
        />
      </View>
    );
  }, [
    colors.dangerMain,
    colors.neutral10,
    colors.warningMain,
    onDeletePress,
    onEditPress,
  ]);

  return (
    <ReanimatedSwipeable
      friction={2}
      ref={updateRef}
      enableTrackpadTwoFingerGesture
      rightThreshold={22}
      overshootRight={false}
      renderRightActions={renderRightActions}
    >
      <View style={[styles.lessonCard, { backgroundColor: colors.neutral10 }]}>
        <Image
          source={{ uri: video?.thumbnail?.uri }}
          style={styles.thumbnail}
        />
        <Text
          numberOfLines={2}
          style={[
            textStyles.bodyMedium,
            styles.spacer,
            { color: colors.neutral100 },
          ]}
        >
          {title}
        </Text>
        <Text style={[textStyles.bodySmall, { color: colors.neutral70 }]}>
          {formatTime(video.duration)}
        </Text>
      </View>
    </ReanimatedSwipeable>
  );
};

const ModuleHeader = React.memo(
  ({
    title,
    collapsed,
    onTrashIconPress,
    onPlusIconPress,
    toggleCollapse,
    totalLessons,
    totalDuration,
  }: {
    title: string;
    collapsed: boolean;
    onTrashIconPress: () => void;
    onPlusIconPress: () => void;
    toggleCollapse: () => void;
    totalLessons: number;
    totalDuration: number;
  }) => {
    const { colors } = useTheme();

    return (
      <Pressable onPress={toggleCollapse}>
        <View style={styles.cardHeader}>
          <AnimatedChevron isOpen={!collapsed} />
          <View style={styles.headerTextContainer}>
            <Text
              style={[textStyles.titleMedium, { color: colors.neutral100 }]}
            >
              {title}
            </Text>
            <Text style={[textStyles.labelSmall, { color: colors.neutral80 }]}>
              {totalLessons} {totalLessons > 1 ? "Lessons" : "Lesson"} (
              {formatTime(totalDuration)})
            </Text>
          </View>
          <Pressable onPress={onTrashIconPress}>
            <TrashIcon stroke={colors.dangerMain} />
          </Pressable>
          <Pressable onPress={onPlusIconPress}>
            <PlusCircleIcon strokeWidth={2} stroke={colors.primary} />
          </Pressable>
        </View>
      </Pressable>
    );
  },
);

ModuleHeader.displayName = "ModuleHeader";

const LessonList = React.memo(
  ({
    collapsed,
    lessons,
    onEditPress,
  }: {
    collapsed: boolean;
    onEditPress: (les: ILocalLesson) => void;
    lessons: ILocalLesson[];
  }) => {
    const { colors } = useTheme();
    return (
      <Collapsible isVisible={collapsed} style={styles.lessonListContainer}>
        <>
          {lessons.length ? (
            lessons.map((lesson) => (
              <LessonListItem
                key={lesson.id}
                title={lesson.title}
                video={lesson.video}
                onEditPress={() => {
                  onEditPress(lesson);
                }}
                onDeletePress={() => {}}
              />
            ))
          ) : (
            <Text
              style={[
                textStyles.bodyLarge,
                styles.noLessonText,
                { color: colors.neutral70 },
              ]}
            >
              No Lessons
            </Text>
          )}
        </>
      </Collapsible>
    );
  },
);

LessonList.displayName = "LessonList";

const CourseCurriculum = () => {
  const { modules, setModules } = useCreateCourseState();
  const lessonBottomSheetRef = useRef<LessonBottomSheetRef | null>(null);

  const deleteModule = useCallback(
    (moduleId: string) => {
      setModules((prev) => prev.filter((m) => m.id !== moduleId));
    },
    [setModules],
  );

  const toggleCollapse = useCallback(
    (moduleId: string) => {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, collapsed: !m.collapsed } : m,
        ),
      );
    },
    [setModules],
  );

  const addLesson = (
    newLesson: ILocalLesson,
    { moduleId, moduleTitle }: { moduleId: string; moduleTitle: string },
  ) => {
    setModules((prevModules) => {
      // Copy previous modules to avoid mutation
      const tempModules = [...prevModules];
      const moduleIndex = tempModules.findIndex((m) => m.id === moduleId);

      // If module exists
      if (moduleIndex !== -1) {
        const module = tempModules[moduleIndex];
        const lessons = [...module.lessons];
        const lessonIndex = lessons.findIndex((l) => l.id === newLesson.id);

        if (lessonIndex !== -1) {
          // Update existing lesson
          lessons[lessonIndex] = { ...lessons[lessonIndex], ...newLesson };
        } else {
          // Add new lesson
          lessons.push(newLesson);
        }

        // Update module title and lessons
        tempModules[moduleIndex] = {
          ...module,
          title: moduleTitle,
          lessons,
          collapsed: false,
        };

        return tempModules;
      }

      // If module doesn't exist, create it with the new lesson
      return [
        ...tempModules,
        {
          id: moduleId,
          title: moduleTitle,
          lessons: [newLesson],
          collapsed: true,
        },
      ];
    });
  };

  const renderModuleItem = useCallback(
    ({ item: module }: { item: ILocalModule; index: number }) => {
      const totalDuration = module.lessons.reduce(
        (sum, l) => sum + Number(l.video.duration || 0),
        0,
      );

      return (
        <View key={module.id} style={styles.card}>
          <ModuleHeader
            title={module.title}
            totalDuration={totalDuration}
            totalLessons={module.lessons.length}
            collapsed={module.collapsed}
            onTrashIconPress={() => deleteModule(module.id)}
            onPlusIconPress={() =>
              lessonBottomSheetRef.current?.present({
                title: module.title,
                id: module.id,
              })
            }
            toggleCollapse={() => toggleCollapse(module.id)}
          />
          <LessonList
            collapsed={module.collapsed}
            lessons={module.lessons}
            onEditPress={(les) => {
              lessonBottomSheetRef.current?.present(
                { title: module.title, id: module.id },
                les,
              );
            }}
          />
        </View>
      );
    },
    [deleteModule, toggleCollapse],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        renderItem={renderModuleItem}
        keyExtractor={(item) => item.id}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.buttonRow}>
        <AppButton
          containerStyle={styles.spacer}
          title="Add Module"
          onPress={() => lessonBottomSheetRef.current?.present()}
        />
        <AppButton
          isOutlined
          containerStyle={styles.spacer}
          disabled={modules.length === 0}
          title="Next"
        />
      </View>
      <LessonBottomSheet ref={lessonBottomSheetRef} onSave={addLesson} />
    </View>
  );
};

export default CourseCurriculum;

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { paddingVertical: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    columnGap: 8,
    marginStart: 8,
    marginEnd: 16,
  },
  headerTextContainer: {
    flex: 1,
    rowGap: 2,
  },
  lessonListContainer: {
    paddingVertical: 8,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginVertical: 12,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: {
    height: 60,
    aspectRatio: 1.4,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    marginBottom: 24,
    marginHorizontal: 16,
  },

  spacer: {
    flex: 1,
  },
  noLessonText: { textAlign: "center" },
});
