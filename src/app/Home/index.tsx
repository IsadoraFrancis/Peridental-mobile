import {
  View,
  SafeAreaView, // Mantenha SafeAreaView para o container principal que lida com a barra de status
  Text,
  Image,
  TouchableOpacity,
  ScrollView, // <-- Importe ScrollView
} from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { CaseCard } from "@/components/CaseCard";
import { Input } from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";

export function Home({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.summaryPanel}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Casos em Andamento</Text>
            <Text style={styles.summaryNumber}>102</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Casos Arquivados</Text>
            <Text style={styles.summaryNumber}>30</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Casos Concluídos</Text>
            <Text style={styles.summaryNumber}>60</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>

        <Input />

        <View style={styles.casesHeader}>
          <Text style={styles.overviewText}>Casos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddCase')}>
            <Ionicons name="add-circle-outline" size={32} color="#00223A" />
          </TouchableOpacity>
        </View>

        <CaseCard navigation={navigation} />

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>VER TUDO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('AddEvidence')}>
            <Text style={styles.bottomButtonText}>ADICIONAR EVIDÊNCIA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}