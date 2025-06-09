// src/screens/styles/index.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', 
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center', 
    },
    titleSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    highlightText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B30E2F', 
        textAlign: 'center', 
        lineHeight: 28,
    },

    caseTitleColor: { 
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00223A',
        textAlign: 'center', 
        lineHeight: 28,
    },
    baseTitleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 28,
    },
    divider: {
        width: '100%',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 0,
    },
    detailsSection: {
        width: '100%',
        padding: 15,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00223A', 
    },
    detailValue: {
        fontSize: 15,
        color: '#333333',
        flexShrink: 1, 
        textAlign: 'right', 
    },
    generalInfoSection: {
        width: '100%',
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00223A',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    generalInfoText: {
        fontSize: 15,
        color: '#444444',
        lineHeight: 22,
        marginBottom: 15,
    },
   generalEvidenceSection:{
    fontSize: 15,
        color: '#444444',
        lineHeight: 22,
        marginBottom: 15,
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

    bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 10,
    marginBottom: 30,
  },
  bottomButton: {
    backgroundColor: "#00223A",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginLeft: 40
  },
  bottomButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },

  ButtonsContainerBotton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 30,
  },
  ButtonBotton: {
    backgroundColor: "#00223A",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%", 
  },
  ButtonTextBotton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
});