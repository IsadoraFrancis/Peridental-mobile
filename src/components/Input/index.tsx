import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export function Input({ ...rest }: TextInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={24} color="#8A879C" />
        <TextInput style={styles.input} placeholder="Pesquisar" />
        <Ionicons name="options-outline" size={24} color="#8A879C" />
      </View>
    </View>
  );
}
