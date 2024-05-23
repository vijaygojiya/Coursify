// import {type Theme as NativeTheme} from '@react-navigation/native';

// declare global {
//   namespace ReactNavigation {
//     interface Theme extends NativeTheme {
//       colors: NativeTheme['colors'] & {
//         // Your custom colors
//         warning: string;
//       };
//     }
//   }
// }

import colors from '@/styles/colors';
import '@react-navigation/native';

// Override the theme in react native navigation to accept our custom theme props.
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: typeof colors;
  };
  export function useTheme(): ExtendedTheme;
}
