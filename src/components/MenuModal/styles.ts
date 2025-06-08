import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    width: "75%",
    height: "100%",
    backgroundColor: "#00223A",
    paddingTop: 40,
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#1F4667",
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  menuTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userInfoSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1F4667",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userIdText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  changeInfoText: {
    color: "#B30E2F",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  menuItemsContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1F4667",
  },
  menuItemText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: "auto",
    marginBottom: 20,
  },
  logoutButtonText: {
    color: "#B30E2F",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
