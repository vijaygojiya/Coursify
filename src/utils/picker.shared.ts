import {
  type ImagePickerOptions,
  launchImageLibraryAsync,
  UIImagePickerPreferredAssetRepresentationMode,
} from "expo-image-picker";
import { isIos, VIDEO_MAX_DURATION_MS } from "@/utils/constant";

// Fairly accurate estimate that is more performant
// than decoding and checking length of URI
export function getDataUriSize(uri: string): number {
  return Math.round((uri.length * 3) / 4);
}

export type ImageMeta = {
  path: string;
  width: number;
  height: number;
  mime: string;
};

export type PickerImage = ImageMeta & {
  size: number;
};

export async function openPicker(opts?: ImagePickerOptions) {
  const response = await launchImageLibraryAsync({
    exif: false,
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 1,
    selectionLimit: 1,
    ...opts,
    legacy: true,
    preferredAssetRepresentationMode:
      UIImagePickerPreferredAssetRepresentationMode.Automatic,
  });

  return (response.assets ?? [])
    .filter((asset) => {
      if (asset.mimeType?.startsWith("image/")) return true;
      // Toast.show(t`Only image files are supported`, 'exclamation-circle')
      return false;
    })
    .map((image) => ({
      mime: image.mimeType || "image/jpeg",
      height: image.height,
      width: image.width,
      path: image.uri,
      size: getDataUriSize(image.uri),
    }));
}

export async function openUnifiedPicker({
  selectionCountRemaining,
}: {
  selectionCountRemaining: number;
}) {
  return await launchImageLibraryAsync({
    exif: false,
    mediaTypes: ["images", "videos"],
    quality: 1,
    allowsMultipleSelection: true,
    legacy: true,
    selectionLimit: isIos ? selectionCountRemaining : undefined,
    preferredAssetRepresentationMode:
      UIImagePickerPreferredAssetRepresentationMode.Automatic,
    videoMaxDuration: VIDEO_MAX_DURATION_MS / 1000,
  });
}
