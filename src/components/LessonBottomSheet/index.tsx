import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import AppButton from "../AppButton";
import BottomSheetAppTextInput from "../BottomSheetAppTextInput";
import FileSelector from "../FileSelector";
import AppBottomSheetBackdrop from "../AppBottomSheetBackdrop";
import AppSheetHandleComponent from "../AppSheetHandleComponent";
import { ILocalLesson } from "@/screens/Instructors/CourseCurriculum";
import { getUniqueId } from "@/utils";
import { ImagePickerAsset } from "expo-image-picker";

export interface LessonBottomSheetRef {
  present: (mod?: { title: string; id: string }, less?: ILocalLesson) => void;
}

const LessonBottomSheet = forwardRef<
  LessonBottomSheetRef,
  {
    onSave: (
      lesson: ILocalLesson,
      moduleData: {
        moduleTitle: string;
        moduleId: string;
      }
    ) => void;
  }
>(({ onSave }, ref) => {
  const [moduleTitle, setModuleTitle] = useState("");
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<ImagePickerAsset | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  const moduleId = useRef<string | null>(null);
  const lessonId = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    present: (module, lesson) => {
      if (module) {
        moduleId.current = module.id;
        setModuleTitle(module.title);
      }
      if (lesson) {
        setTitle(lesson.title);
        setVideoFile(lesson.video);
        lessonId.current = lesson.id;
      }
      bottomSheetRef.current?.present();
    },
  }));

  const handleSave = () => {
    if (videoFile && title && moduleTitle) {
      onSave(
        {
          title,
          video: videoFile,
          id: lessonId.current ?? getUniqueId(),
        },
        {
          moduleTitle: moduleTitle,
          moduleId: moduleId.current ?? getUniqueId(),
        }
      );
    }
    bottomSheetRef.current?.close();
  };

  const renderHandle = useCallback(
    () => <AppSheetHandleComponent title="Add new lesson" />,
    []
  );

  const onChange = useCallback((index: number) => {
    if (index === -1) {
      moduleId.current = null;
      setTitle("");
      setVideoFile(null);
      setModuleTitle("");
      lessonId.current = null;
    }
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onChange={onChange}
      backdropComponent={AppBottomSheetBackdrop}
      handleComponent={renderHandle}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
        <BottomSheetAppTextInput
          label="Module Title"
          value={moduleTitle}
          onChangeText={setModuleTitle}
          placeholder="Basic of React Native"
        />
        <BottomSheetAppTextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Welcome to the course"
        />
        <FileSelector
          placeholder={"Video file mp4 only"}
          options={{ type: "video" }}
          onRemoveFile={() => {
            setVideoFile(null);
          }}
          label={"Video"}
          file={videoFile}
          onFileSelected={setVideoFile}
        />
        <AppButton
          disabled={!title || !videoFile}
          title="Submit"
          onPress={handleSave}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default LessonBottomSheet;
