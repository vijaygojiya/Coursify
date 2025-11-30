import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

export async function uploadAvatarSimple(
  userId: string,
  file: ImagePicker.ImagePickerAsset,
) {
  try {
    const mimeType = file.mimeType ?? mime.getType(file.uri) ?? "image/jpeg";
    const fileExt = mime.getExtension(mimeType);
    const filePath = `${userId}_${Date.now()}.${fileExt}`;
    const arraybuffer = await fetch(file.uri).then((res) => res.arrayBuffer());

    // Upload to bucket
    const { error: uploadError, data } = await supabase.storage
      .from("avatars")
      .upload(filePath, arraybuffer, {
        upsert: true,
        contentType: mimeType,
      });

    if (uploadError) throw uploadError;
    const { data: res } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    return res.publicUrl;
  } catch (error) {
    console.log("error while uplaod file", error);
    throw error;
  }
}
