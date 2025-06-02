import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";

export function AddCase() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Informações Gerais</Text>
    </View>
  );
}
