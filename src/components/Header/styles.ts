import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#296D9D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "Poppins_700Bold", // se você estiver usando a fonte Poppins
    color: "#fff",
  },
});
