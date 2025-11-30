import { textStyles } from "@/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  labelText: {
    ...textStyles.bodySmall,
    marginBottom: 8,
  },
  textInput: {
    ...textStyles.bodyMedium,
    flex: 1,
    paddingVertical: 0,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 4,
  },
  rowContainer: {
    rowGap: 8,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderRadius: 8,
    borderStyle: "dashed",
  },
  error: {
    ...textStyles.bodySmall,
    marginTop: 4,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    marginHorizontal: 28,
  },
});

export default styles;
