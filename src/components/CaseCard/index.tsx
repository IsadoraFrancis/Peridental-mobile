import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface CaseCardProps {
    navigation: any; 
}

export function CaseCard({ navigation }: CaseCardProps) {
    const mockCaseData = {
        caseNumber: '045',
        caseTitle: 'Identificação de Indivíduo Desconhecido',
        status: 'Em Andamento',
        openingDate: '19/06/2023',
        openingTime: '21:59:28',
        responsibleExpert: 'Dr. Marcos Almeida',
        caseType: 'Identificação Odonto-Legal',
        generalInfo: 'Um corpo foi encontrado em avançado estado de decomposição em uma área rural nos arredores de Recife. Como não havia documentos ou qualquer outro meio de identificação imediato, a perícia odontológica foi solicitada para comparar os registros dentários com bancos de dados forenses.',
        occurrenceLocation: 'Zona rural de Recife, PE',
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Caso Nº 102</Text>
            </View>
            <View style={styles.line} />

            <Text style={styles.text}>
                Descrição: Identificação de vítima de acidente rodoviário.
            </Text>
            <Text style={styles.text}>Responsável: Dr. Marcos Almeida</Text>
            <Text style={styles.text}>Data: 10/09/2024</Text>

            <TouchableOpacity
                style={styles.viewButton}
                // O onPress principal deve estar aqui
                onPress={() => navigation.navigate('CaseDetails', { caseData: mockCaseData })}
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