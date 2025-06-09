import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#296D9D",
    marginVertical: 20,
  },
  recentViewedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
    marginTop: 20,
  },
  cardsContainer: {
    width: "90%",
    flexGrow: 0,
    marginBottom: 20,
  },
  viewAllButton: {
    backgroundColor: "#B30E2F",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  viewAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
