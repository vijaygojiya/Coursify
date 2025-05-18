import * as SVGs from '@/assets';
import {Thumbnail} from 'react-native-create-thumbnail';

export type SVGsNames = keyof typeof SVGs;

declare module 'react-native-image-crop-picker' {
  interface Video {
    thumbnail: Thumbnail | null;
  }
}
