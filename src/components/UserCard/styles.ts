import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00223A",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: "#ccc", // Cor de fundo para o placeholder
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    color: "#ccc",
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: "#B30E2F",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonText: {
    color: "#fff",
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 14,
  },
});
