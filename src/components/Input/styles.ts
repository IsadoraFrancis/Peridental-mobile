import { StyleSheet } from "react-native";
import { themes } from "@/global/themes";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  search: {
    width: "100%",
    maxWidth: 350,
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: themes.colors.bgText,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
  },
});
