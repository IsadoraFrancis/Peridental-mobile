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

  },

  text: {
    fontSize: 40,
     fontWeight: "bold",
    color: "white",
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
