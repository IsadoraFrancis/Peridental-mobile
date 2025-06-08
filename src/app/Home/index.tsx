import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { CaseCard } from "@/components/CaseCard";
import { Input } from "@/components/Input";

export function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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

      <Text style={styles.overviewText}>Visão Geral</Text>

      <CaseCard />

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>VER TUDO</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>ADICIONAR CASO</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>ADICIONAR EVIDÊNCIA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
