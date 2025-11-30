import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 18,
  },
  img: {
    aspectRatio: 16 / 9,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    width: "100%",
    marginBottom: 8,
  },
});
export default styles;
