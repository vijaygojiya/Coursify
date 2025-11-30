import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 22,
    columnGap: 14,
    flexGrow: 0,
  },
  listHeaderContainer: {
    marginTop: 2,
    marginBottom: 12,
    paddingStart: 18,
    paddingEnd: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: { flex: 1 },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
