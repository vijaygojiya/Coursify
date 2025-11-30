import { AppFonts } from "@/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 220,
  },
  image: {
    aspectRatio: 16 / 9,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontFamily: AppFonts.medium,
    marginBottom: 4,
  },
  instructor: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
});
export default styles;
