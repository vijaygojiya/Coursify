import {Dimensions, Platform} from 'react-native';

export const isIos = Platform.OS === 'ios';

export const randomUserImage = 'https://picsum.photos/200';
export const randomCourseImage = 'https://picsum.photos/300/?blur=2';
export const {width: screenWidth} = Dimensions.get('screen');

export const VIDEO_MAX_DURATION_MS = 3 * 60 * 1000 // 3 minutes in milliseconds