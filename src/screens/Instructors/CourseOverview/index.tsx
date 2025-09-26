import { StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  AppButton,
  AppTextInput,
  FileSelector,
  OptionSheet,
  PlaceholderInput,
} from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { courseBasicInfoSchema, extractFirstErrors } from '@/utils';
import { ZodError } from 'zod';
import { CreateNewCourseStackScreenProps } from '@/typings/navigation';
import Routes from '@/navigation/Routes';
import { useCreateCourseState } from '@/contexts/CreateCourseContext';

type keys = 'title' | 'shortDescription' | 'level' | 'coverImg' | 'promoVideo';

const CourseOverview = ({
  navigation,
}: CreateNewCourseStackScreenProps<'CourseOverview'>) => {
  const {
    coverImg,
    setCoverImage,
    promoVideo,
    setPromoVideo,
    title,
    setTitle,
    shortDescription,
    setShortDescription,
    level,
    setLevel,
  } = useCreateCourseState();

  const [errors, setErrors] = useState<Record<keys, string>>({
    title: '',
    shortDescription: '',
    level: '',
    coverImg: '',
    promoVideo: '',
  });

  const levelOptionSheetRef = useRef<BottomSheetModal>(null);

  const isAllFiledEnter = useMemo(() => {
    return title && shortDescription && !!promoVideo && !!coverImg && level;
  }, [title, shortDescription, promoVideo, coverImg, level]);

  const onNextBtnPress = useCallback(() => {
    try {
      courseBasicInfoSchema.parse({
        title,
        shortDescription,
        ...(level ? { level } : {}),

        ...(promoVideo ? { promoVideo } : {}),
        ...(coverImg ? { coverImg } : {}),
      });
      navigation.navigate(Routes.CourseCurriculum);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = extractFirstErrors(error);
        setErrors(validationErrors);
      }
    }
  }, [coverImg, level, navigation, promoVideo, shortDescription, title]);

  return (
    <KeyboardAwareScrollView
      overScrollMode="never"
      bounces={false}
      contentContainerStyle={styles.scrollContentStyle}
    >
      <AppTextInput
        label="Title"
        placeholder="e.g. Mastering React Native"
        maxLength={100}
        value={title}
        onChangeText={setTitle}
        error={errors.title}
      />
      <AppTextInput
        label="Short Description"
        placeholder="Write a brief summary of your course"
        maxLength={160}
        style={{ height: 78 }}
        multiline={true}
        value={shortDescription}
        onChangeText={setShortDescription}
        error={errors.shortDescription}
      />
      <PlaceholderInput
        label="Level"
        placeholder="Please select level"
        value={level}
        onPress={() => {
          levelOptionSheetRef.current?.present();
        }}
        error={errors.level}
      />
      <FileSelector
        label="Course Cover Image"
        placeholder="Select an image to represent your course"
        file={coverImg}
        onFileSelected={setCoverImage}
        options={{
          mediaType: 'photo',
          cropping: true,
          width: 1600,
          height: 900,
          cropperToolbarTitle: 'Crop Cover Image',
          cropperCircleOverlay: false,
          compressImageQuality: 0.8,
          includeBase64: false,
          forceJpg: true,
        }}
        onRemoveFile={() => {
          setCoverImage(null);
        }}
        error={errors.coverImg}
      />
      <FileSelector
        label="Promo Video"
        placeholder={'Upload 60s course intro video\n(MP4, max 60 sec)'}
        file={promoVideo}
        onFileSelected={setPromoVideo}
        options={{ mediaType: 'video' }}
        onRemoveFile={() => {
          setPromoVideo(null);
        }}
        error={errors.promoVideo}
      />
      <AppButton
        title="Next"
        disabled={!isAllFiledEnter}
        onPress={onNextBtnPress}
      />
      <OptionSheet
        configList={[
          { name: 'Beginner' },
          { name: 'Intermediate' },
          { name: 'Advanced' },
        ]}
        ref={levelOptionSheetRef}
        onItemSelect={name => {
          setLevel(name);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default CourseOverview;

const styles = StyleSheet.create({
  scrollContentStyle: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 28,
  },
});
