import { type IAppColor } from "@/styles";
import { type Theme as NativeTheme } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface Theme extends NativeTheme {
      colors: NativeTheme["colors"] & IAppColor;
    }
  }
}
