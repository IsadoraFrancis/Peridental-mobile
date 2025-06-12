import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "@/components/Header";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { CaseCard } from "@/components/CaseCard";

interface CaseData {
  _id: string;
  title: string;
  description: string;
  type: "acidente" | "identificacao" | "criminal";
  status: "em_andamento" | "finalizado" | "arquivado";
  responsible: {
    _id: string;
    name: string;
    email: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  data: string;
  historico?: string;
  analises?: string;
  patients: Array<{
    _id: string;
    nome: string;
    nic: string;
  }>;
  evidences: Array<any>;
  reports: Array<any>;
  createdAt: string;
  updatedAt: string;
}

export function CaseDetails({ navigation }: any) {
  const route = useRoute();
  const { caseData } = route.params as { caseData: CaseData };

  if (!caseData) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nenhum dado de caso encontrado.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Função para formatar a hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR");
  };

  // Função para traduzir o status
  const translateStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      em_andamento: "Em Andamento",
      finalizado: "Finalizado",
      arquivado: "Arquivado",
    };
    return statusMap[status] || status;
  };

  // Função para traduzir o tipo
  const translateType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      acidente: "Acidente",
      identificacao: "Identificação",
      criminal: "Criminal",
    };
    return typeMap[type] || type;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Título do Caso Pericial */}
        <View style={styles.titleSection}>
          <Text style={styles.baseTitleText}>
            <Text style={styles.highlightText}>
              Caso Pericial Nº - {caseData._id}
            </Text>{" "}
            <Text style={styles.caseTitleColor}>{caseData.title}</Text>
          </Text>
        </View>

        {/* Informações Detalhadas */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status Atual:</Text>
            <Text style={styles.detailValue}>
              {translateStatus(caseData.status)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Data Abertura:</Text>
            <Text style={styles.detailValue}>{formatDate(caseData.data)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hora Abertura:</Text>
            <Text style={styles.detailValue}>{formatTime(caseData.data)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Perito Responsável:</Text>
            <Text style={styles.detailValue}>{caseData.responsible.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo de Caso:</Text>
            <Text style={styles.detailValue}>
              {translateType(caseData.type)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.generalInfoSection}>
          <Text style={styles.sectionTitle}>Informações Gerais de Caso</Text>
          <Text style={styles.generalInfoText}>{caseData.description}</Text>
          {caseData.historico && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Histórico:</Text>
              <Text style={styles.detailValue}>{caseData.historico}</Text>
            </View>
          )}
          {caseData.analises && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Análises:</Text>
              <Text style={styles.detailValue}>{caseData.analises}</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.generalEvidenceSection}>
          <Text style={styles.sectionTitle}>Vítimas do Caso</Text>
          <Input />
          {caseData.patients.map((patient) => (
            <View key={patient._id} style={styles.cardContainer}>
              <Text style={styles.patientName}>{patient.nome}</Text>
              <Text style={styles.patientNic}>NIC: {patient.nic}</Text>
            </View>
          ))}
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>ADICIONAR VÍTIMA</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.generalEvidenceSection}>
          <Text style={styles.sectionTitle}>Evidências do Caso</Text>
          <Input />
          {caseData.evidences.map((evidence) => (
            <View key={evidence._id} style={styles.cardContainer}>
              <Text style={styles.evidenceType}>{evidence.type}</Text>
              <Text style={styles.evidenceContent}>{evidence.content}</Text>
            </View>
          ))}
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => navigation.navigate("AddEvidence")}
            >
              <Text style={styles.bottomButtonText}>ADICIONAR EVIDÊNCIA</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.generalEvidenceSection}>
          <Text style={styles.sectionTitle}>
            Laudos e Documentações do Caso
          </Text>
          <Input />
          {caseData.reports.map((report) => (
            <View key={report._id} style={styles.cardContainer}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportContent}>{report.content}</Text>
            </View>
          ))}
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>ADICIONAR LAUDOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ButtonsContainerBotton}>
          <TouchableOpacity style={styles.ButtonBotton}>
            <Text style={styles.ButtonTextBotton}>EDITAR CASO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.ButtonTextBotton}>EXCLUIR CASO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
