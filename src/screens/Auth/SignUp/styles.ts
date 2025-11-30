import { AppFonts, textStyles } from "@/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingHorizontal: 16 },
  appTitle: { ...textStyles.headlineMedium, marginVertical: 8 },
  footerText: { ...textStyles.bodyMedium, textAlign: "center" },
  createAccountText: {
    fontFamily: AppFonts.medium,
  },

  spacer: {
    flex: 1,
  },
});
export default styles;
