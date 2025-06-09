import { StyleSheet } from "react-native";
import { themes } from "@/global/themes";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  search: {
    width: "100%",
    maxWidth: 350,
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    color: "#333",
  },
});
