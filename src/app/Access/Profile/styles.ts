import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00223A",
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00223A",
  },
  userRole: {
    fontSize: 16,
    color: "#00223A",
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#296D9D",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#8A879C",
  },
  activeTabButtonText: {
    fontWeight: "bold",
    color: "#296D9D",
  },
  contentContainer: {
    flex: 1,
    width: "90%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#296D9D",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: "#B30E2F",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Informações Gerais - Seção
  infoSection: {
    padding: 10,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#333",
    width: 120,
  },
  infoValue: {
    color: "#666",
    flex: 1,
  },
  aboutSection: {
    marginTop: 10,
  },
  aboutTitle: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  aboutText: {
    color: "#666",
    lineHeight: 20,
  },
  // Histórico - Seção
  historyItem: {
    backgroundColor: "#296D9D",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  historyDate: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
  },
  historyDescription: {
    color: "#fff",
    fontSize: 16,
  },
  viewAllButton: {
    backgroundColor: "#B30E2F",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  viewAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#296D9D",
    marginVertical: 20,
  },
});
