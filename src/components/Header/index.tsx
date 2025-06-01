import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />
        <Text style={styles.name}>Peridental</Text>
      </View>
      <TouchableOpacity onPress={() => console.log("Menu aberto")}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
