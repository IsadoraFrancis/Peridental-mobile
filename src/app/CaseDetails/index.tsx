// src/screens/CaseDetailsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header'; // Assumindo que você usa o mesmo Header
import { styles } from './styles'; // Importa o novo arquivo de estilos
import { Input } from "@/components/Input";

// Interface para o objeto de caso (adapte conforme o seu AddCase ou backend)
interface CaseData {
    caseNumber: string;
    caseTitle: string;
    status: string;
    openingDate: string;
    openingTime: string;
    responsibleExpert: string;
    caseType: string;
    generalInfo: string; // Descrição geral do caso
    occurrenceLocation: string; // Local da ocorrência
    // Você pode adicionar mais campos aqui se necessário, como lista de evidências
    // evidences?: Evidence[]; // Se quiser passar as evidências do caso
}

export function CaseDetails() {
    const navigation = useNavigation();
    const route = useRoute();

    // Use o hook useRoute para acessar os parâmetros passados
    // O 'caseData' será do tipo CaseData ou undefined se não for passado
    const { caseData } = route.params as { caseData: CaseData };

    // Caso não haja dados (o que não deveria acontecer se a navegação for correta)
    if (!caseData) {
        return (
            <SafeAreaView style={styles.container}>
                <Header />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Nenhum dado de caso encontrado.</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header /> {/* Seu componente de cabeçalho */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Título do Caso Pericial */}
                <View style={styles.titleSection}>
                    <Text style={styles.baseTitleText}> {/* UM NOVO ESTILO BASE OU NEUTRO SE NECESSÁRIO */}
                        <Text style={styles.highlightText}>
                            Caso Pericial Nº - {caseData.caseNumber}
                        </Text>
                        {' '} {/* Adicione um espaço aqui, se quiser */}
                        <Text style={styles.caseTitleColor}> {/* Dê um nome mais claro para a cor do caseTitle */}
                            {caseData.caseTitle}
                        </Text>
                    </Text>
                </View>
                
                {/* Informações Detalhadas */}
                <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Status Atual:</Text>
                        <Text style={styles.detailValue}>{caseData.status}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Data Abertura:</Text>
                        <Text style={styles.detailValue}>{caseData.openingDate}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Hora Abertura:</Text>
                        <Text style={styles.detailValue}>{caseData.openingTime}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Perito Responsável:</Text>
                        <Text style={styles.detailValue}>{caseData.responsibleExpert}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Tipo de Caso:</Text>
                        <Text style={styles.detailValue}>{caseData.caseType}</Text>
                    </View>
                </View>

                {/* Linha Divisória */}
                <View style={styles.divider} />

                {/* Informações Gerais de Caso */}
                <View style={styles.generalInfoSection}>
                    <Text style={styles.sectionTitle}>Informações Gerais de Caso</Text>
                    <Text style={styles.generalInfoText}>
                        {caseData.generalInfo}
                    </Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Local do Ocorrência:</Text>
                        <Text style={styles.detailValue}>{caseData.occurrenceLocation}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                
                <View style={styles.generalEvidenceSection}>
                    <Text style={styles.sectionTitle}>Informações Gerais de Caso</Text>
                    <Input />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}