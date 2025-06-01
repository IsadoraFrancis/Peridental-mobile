import { View, Text, Image } from "react-native";
import { styles } from "./styles";

export function Hello() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} />
      <Text style={styles.text}>Peridental</Text>
    </View>
  );
}
