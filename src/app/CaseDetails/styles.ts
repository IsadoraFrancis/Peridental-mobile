// src/screens/styles/index.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', // Um cinza claro para o fundo
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 40, // Adiciona espaço no final para o scroll
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
    },
    titleSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    // Este será a cor para 'Caso Pericial Nº - {caseData.caseNumber}'
    highlightText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B30E2F', // Vermelho escuro
        textAlign: 'center', // Pode ser removido se o pai já centraliza
        lineHeight: 28,
    },
    // Este será a cor para '{caseData.caseTitle}'
    caseTitleColor: { // Renomeado de caseTitle para ser mais específico
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00223A', // Azul escuro
        textAlign: 'center', // Pode ser removido se o pai já centraliza
        lineHeight: 28,
    },
    // Se você tiver um estilo base para o Text container que só define fonte/tamanho/etc.
    baseTitleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 28,
    },
    divider: {
        width: '90%',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    detailsSection: {
        width: '90%',
        padding: 15,
        marginBottom: 20,
        marginRight: 60
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00223A', // Azul escuro
    },
    detailValue: {
        fontSize: 15,
        color: '#333333',
        flexShrink: 1, // Permite que o texto quebre linha se for muito longo
        textAlign: 'right', // Alinha o valor à direita
    },
    generalInfoSection: {
        width: '90%',
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00223A',
        marginBottom: 10,
        textAlign: 'center',
    },
    generalInfoText: {
        fontSize: 15,
        color: '#444444',
        lineHeight: 22,
        marginBottom: 15,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginTop: 20,
    },
    actionButton: {
        backgroundColor: '#005792', // Azul médio para os botões de ação
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    // Estilos para o caso de erro (se o caseData não for passado)
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#005792',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});