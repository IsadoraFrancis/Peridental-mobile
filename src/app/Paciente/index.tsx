import {
  View,
  SafeAreaView, 
  Text,
  TouchableOpacity,
  ScrollView, 
} from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { CaseCard } from "@/components/CaseCard";
import { Input } from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";

export function Paciente({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
    
        <Input />

        <View style={styles.casesHeader}>
          <Text style={styles.overviewText}>Pacientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddCase')}>
          </TouchableOpacity>
        </View>

        <CaseCard navigation={navigation} />

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>VER TUDO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('AddPaciente')}>
            <Text style={styles.bottomButtonText}>ADICIONAR PACIENTE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}