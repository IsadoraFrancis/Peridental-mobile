import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#296D9D",
    alignItems: "center",
    width: 345,
    justifyContent: "flex-start",
    height: 320,
    position: "relative",
  },
  titleContainer: {
    alignItems: "center", // Centraliza horizontalmente o texto
    justifyContent: "center",
  },
  iconPlus: {
    position: "absolute",
    left: 160,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 22,
    marginBottom: 4,
  },
  line: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 25,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: "#B30E2F",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  viewButtonText: {
    color: "#fff",
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  navigationArrowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
