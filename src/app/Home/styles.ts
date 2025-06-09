import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: { 
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20, 
  },

  casesHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '90%', 
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 0, 
  },
  overviewText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00223A",
    flex: 1, 
    textAlign: 'center',
    marginLeft: 35
  },

  text: {
    fontSize: 40,
     fontWeight: "bold",
    color: "white",
  },
  summaryPanel: {
    backgroundColor: "#00223A",
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10,
    width: "30%",
  },
  summaryText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  summaryNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#B30E2F",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 20,
    marginBottom: 30
  },
  bottomButton: {
    backgroundColor: "#00223A",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  bottomButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
});
