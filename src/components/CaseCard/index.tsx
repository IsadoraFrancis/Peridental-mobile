import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useState, useEffect } from "react";
import { caseService } from "@/services/caseService";
import { Case } from "@/types/case";

interface CaseCardProps {
  navigation: any;
}

export function CaseCard({ navigation }: CaseCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  useEffect(() => {
    loadCases();
  }, [currentPage]);

  const loadCases = async () => {
    try {
      setLoading(true);
      const response = await caseService.getCases(currentPage);
      setCases(response.data.cases);
      setTotalPages(response.data.pagination.pages);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar casos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex((prev) => prev - 1);
    } else if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setCurrentCaseIndex(9); // Volta para o último caso da página anterior
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
    } else if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setCurrentCaseIndex(0); // Vai para o primeiro caso da próxima página
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const currentCase = cases[currentCaseIndex];

  if (!currentCase) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum caso encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Caso Nº {currentCase._id}</Text>
      </View>
      <View style={styles.line} />

      <Text style={styles.text}>Descrição: {currentCase.description}</Text>
      <Text style={styles.text}>
        Responsável: {currentCase.responsible.name}
      </Text>
      <Text style={styles.text}>
        Data: {new Date(currentCase.data).toLocaleDateString()}
      </Text>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() =>
          navigation.navigate("CaseDetails", { caseData: currentCase })
        }
      >
        <Text style={styles.viewButtonText}>Visualizar</Text>
        <Ionicons name="eye-outline" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.navigationArrowContainer}>
        <TouchableOpacity
          onPress={handlePreviousCase}
          disabled={currentPage === 1 && currentCaseIndex === 0}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={32}
            color={
              currentPage === 1 && currentCaseIndex === 0 ? "#ccc" : "#fff"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextCase}
          disabled={
            currentPage === totalPages && currentCaseIndex === cases.length - 1
          }
        >
          <Ionicons
            name="arrow-forward-circle-outline"
            size={32}
            color={
              currentPage === totalPages &&
              currentCaseIndex === cases.length - 1
                ? "#ccc"
                : "#fff"
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
