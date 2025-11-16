import { Image, Pressable, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { TrashIcon, UploadIcon } from "@/assets";
import { textStyles } from "@/styles";

import * as ImagePicker from "expo-image-picker";

interface FileSelectorPros {
  label: string;
  error?: string;
  placeholder?: string;
  options?: Partial<ImagePicker.ImagePickerAsset>;
  file: ImagePicker.ImagePickerAsset | null;
  onFileSelected: (f: ImagePicker.ImagePickerAsset) => void;
  onRemoveFile?: () => void;
}

const FileSelector = ({
  label,
  error = "",
  placeholder = "",
  options = {},
  file,
  onRemoveFile,
  onFileSelected,
}: FileSelectorPros) => {
  const { colors } = useTheme();

  const isOpeningGallery = useRef(false);

  const openGallery = useCallback(async () => {
    if (isOpeningGallery.current) {
      return;
    }
    isOpeningGallery.current = true;
    try {
      const finalOptions = {
        cropperToolbarColor: colors.primaryMain,
        cropperToolbarWidgetColor: colors.neutral10,
        cropperActiveWidgetColor: colors.neutral10,
        ...options,
      };
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // const item = result.assets[0]

      // if (options.mediaType === "video") {
      //   const thumbnail = await getVideoThumbnail(selectedImageAsset.path);
      //   console.log("==>", thumbnail);
      //   onFileSelected({ ...selectedImageAsset, thumbnail });
      // } else {
      //   onFileSelected(selectedImageAsset);
      // }
    } catch (gError: unknown) {
      console.log("error while open image crop picker", gError);
    } finally {
      isOpeningGallery.current = false;
    }
  }, [colors.neutral10, colors.primaryMain, onFileSelected, options]);

  return (
    <Pressable
      disabled={!!file}
      onPress={openGallery}
      style={[styles.container]}
    >
      <Text
        numberOfLines={1}
        style={[styles.labelText, { color: colors.neutral80 }]}
      >
        {label}
      </Text>
      <View
        style={[
          styles.rowContainer,
          {
            borderColor: colors.border,
            backgroundColor: colors.neutral10,
          },
        ]}
      >
        {file ? (
          <View style={styles.fileContainer}>
            <Image
              source={{
                uri: file.uri,
              }}
              style={{ height: 44, width: 54, borderRadius: 12 }}
            />
            <Text
              style={[
                textStyles.bodySmall,
                { flex: 1 },
                { color: colors.neutral80 },
              ]}
            >
              {file.fileName}
            </Text>
            <Pressable
              onPress={onRemoveFile}
              style={{
                borderWidth: 1,
                borderColor: colors.dangerMain,
                padding: 4,
                borderRadius: 4,
              }}
            >
              <TrashIcon height={18} width={18} stroke={colors.dangerMain} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.fileContainer}>
            <View
              style={{
                height: 44,
                width: 54,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UploadIcon stroke={colors.neutral60} />
            </View>
            <Text
              style={[
                textStyles.bodyMedium,
                { textAlign: "center", flex: 1 },
                { color: colors.neutral60 },
              ]}
            >
              {placeholder}
            </Text>
          </View>
        )}
      </View>
      <Text
        numberOfLines={2}
        style={[styles.error, { color: colors.dangerMain }]}
      >
        {error}
      </Text>
    </Pressable>
  );
};

export default FileSelector;
