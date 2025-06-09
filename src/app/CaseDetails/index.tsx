// src/screens/CaseDetailsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '@/components/Header'; 
import { styles } from './styles'; 
import { Input } from "@/components/Input";
import { CaseCard } from "@/components/CaseCard";


interface CaseData {
    caseNumber: string;
    caseTitle: string;
    status: string;
    openingDate: string;
    openingTime: string;
    responsibleExpert: string;
    caseType: string;
    generalInfo: string; 
    occurrenceLocation: string; 
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
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header /> 
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Título do Caso Pericial */}
                <View style={styles.titleSection}>
                    <Text style={styles.baseTitleText}>
                        <Text style={styles.highlightText}>
                            Caso Pericial Nº - {caseData.caseNumber}
                        </Text>
                        {' '} 
                        <Text style={styles.caseTitleColor}>
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

                <View style={styles.divider} />

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
                    <Text style={styles.sectionTitle}>Vitímas do Caso</Text>
                    <Input />
                    <CaseCard navigation={navigation} />
                    <View style={styles.bottomButtonsContainer}>
                        <TouchableOpacity style={styles.bottomButton}>
                            <Text style={styles.bottomButtonText}>ADICIONAR VITÍMA</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />
                
                <View style={styles.generalEvidenceSection}>
                    <Text style={styles.sectionTitle}>Evidências do Caso</Text>
                    <Input />
                    <CaseCard navigation={navigation} />
                    <View style={styles.bottomButtonsContainer}>
                        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('AddEvidence')}>
                            <Text style={styles.bottomButtonText}>ADICIONAR EVIDÊNCIA</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.generalEvidenceSection}>
                    <Text style={styles.sectionTitle}>Laudos e Documentações do Caso</Text>
                    <Input />
                    <CaseCard navigation={navigation} />
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