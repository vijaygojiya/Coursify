import * as SVGs from "@/assets";
import { VideoThumbnailsResult } from "expo-video-thumbnails";
export type SVGsNames = keyof typeof SVGs;

declare module "react-native-image-crop-picker" {
  interface Video {
    thumbnail: VideoThumbnailsResult | null;
  }
}
