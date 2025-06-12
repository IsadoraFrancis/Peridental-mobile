import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { PatientCard } from "@/components/PatientCard";
import { patientService } from "@/services/patientService";
import { Patient as PatientType } from "@/types/patient";
import { styles } from "./styles";
import debounce from "lodash/debounce";

type AllPatientsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllPatients"
>;

export function AllPatients() {
  const navigation = useNavigation<AllPatientsScreenNavigationProp>();
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getPatients(page, 20);
      if (response.success && response.data?.data?.patients) {
        // Evitar duplicação de dados
        const newPatients = response.data.data.patients.filter(
          (newPatient) =>
            !patients.some(
              (existingPatient) => existingPatient._id === newPatient._id
            )
        );

        setPatients((prevPatients) => [...prevPatients, ...newPatients]);

        setHasMore(
          response.data.data.pagination.currentPage <
            response.data.data.pagination.totalPages
        );
        setPage((prevPage) => prevPage + 1);
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
      <Input
        placeholder="Buscar paciente..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filteredPatients}
          renderItem={({ item }) => (
            <PatientCard
              patient={item}
              onPress={() =>
                navigation.navigate("PatientDetails", { patient: item })
              }
            />
          )}
          onEndReached={hasMore ? loadPatients : undefined}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
          ListEmptyComponent={() =>
            !loading && (
              <Text style={styles.error}>Nenhum paciente encontrado</Text>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}
