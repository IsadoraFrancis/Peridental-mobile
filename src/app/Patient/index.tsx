import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { PatientCard } from "@/components/PatientCard";
import { Input } from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { patientService } from "@/services/patientService";
import { Patient as PatientType } from "@/types/patient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import debounce from "lodash/debounce";

type PatientScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Patient"
>;

export function Patient() {
  const navigation = useNavigation<PatientScreenNavigationProp>();
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getPatients(1, 10);
      if (response.success && response.data?.data?.patients) {
        setPatients(response.data.data.patients);
        setError(null);
      } else {
        setError(response.message || "Erro ao carregar pacientes");
      }
    } catch (err) {
      setError("Erro ao carregar pacientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadPatients();
    });

    return unsubscribe;
  }, [navigation]);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchTerm(text);
    }, 300),
    []
  );

  const handleSearch = (text: string) => {
    debouncedSearch(text);
  };

  const filteredPatients =
    patients?.filter(
      (patient) =>
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.nic.includes(searchTerm)
    ) || [];

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Input
          placeholder="Buscar paciente..."
          value={searchTerm}
          onChangeText={handleSearch}
        />

        <View style={styles.casesHeader}>
          <Text style={styles.overviewText}>Pacientes</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddPatient", { caseId: undefined })
            }
          >
            <Ionicons name="add-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : filteredPatients.length === 0 ? (
          <Text style={styles.error}>Nenhum paciente encontrado</Text>
        ) : (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onPress={() => navigation.navigate("PatientDetails", { patient })}
            />
          ))
        )}

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate("AllPatients")}
          >
            <Text style={styles.bottomButtonText}>VER TUDO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() =>
              navigation.navigate("AddPatient", { caseId: undefined })
            }
          >
            <Text style={styles.bottomButtonText}>ADICIONAR PACIENTE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
