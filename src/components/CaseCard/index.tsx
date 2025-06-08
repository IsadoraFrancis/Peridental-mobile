import { View, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function CaseCard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Caso Nº 102</Text>
        <TouchableOpacity style={styles.iconPlus}>
          <Ionicons name="add-circle-outline" size={32} color="#00223A" />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />

      <Text style={styles.text}>
        Descrição: Identificação de vítima de acidente rodoviário.
      </Text>
      <Text style={styles.text}>Responsável: Dr. Marcos Almeida</Text>
      <Text style={styles.text}>Data: 10/09/2024</Text>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => console.log("Visualizar caso")}
      >
        <Text style={styles.viewButtonText}>Visualizar</Text>
        <Ionicons name="eye-outline" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.navigationArrowContainer}>
        <TouchableOpacity onPress={() => console.log("Voltar caso")}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Próximo caso")}>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={32}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
