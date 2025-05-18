import * as SVGs from '@/assets';
import {Thumbnail} from 'react-native-create-thumbnail';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export type SVGsNames = keyof typeof SVGs;

export type IAppAssets = ImageOrVideo & {
  thumbnail?: Thumbnail | null;
};
