import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Light background
    },
    contentContainer: {
        padding: 10,
        paddingBottom: 40, // Add some bottom padding
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00223A', // Dark blue
        marginBottom: 20,
        textAlign: 'center',
    },
    // --- Evidence Section Styles ---
    evidenceSection: {
        marginBottom: 15,
        backgroundColor: '#FFFFFF', // White background for sections
        borderRadius: 8,
        padding: 15,
    },
    evidenceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00223A',
        marginBottom: 10,
    },
    evidenceSelectionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00223A', // Medium blue
        padding: 12,
        borderRadius: 8,
    },
    evidenceSelectionText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    evidenceDropdownList: {
        marginTop: 8,
        backgroundColor: '#00223A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        maxHeight: 150, // Limit height for scrollability if many options
        overflow: 'hidden',
    },
    evidenceDropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    evidenceDropdownText: {
        fontSize: 16,
        color: '#fff',
    },
    evidenceButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    evidenceUploadButton: {
        backgroundColor: '#00223A', 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    evidenceUploadText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    evidenceImageContainer: {
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#F7F7F7',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    evidenceImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        resizeMode: 'contain', // Or 'cover' depending on preference
        marginBottom: 10,
    },
    evidenceImageName: {
        fontSize: 14,
        color: '#555555',
        textAlign: 'center',
    },
    evidenceLocationInput: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#296D9D',
    },
    evidenceDescriptionInput: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 80, // Allow multiple lines
        textAlignVertical: 'top', // For Android
        color: '#333333',
        backgroundColor: '#296D9D',
    },
    saveEvidenceButton: {
        backgroundColor: '#AB0535',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 2,
        marginLeft: 18,
        marginRight:18
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    evidenceListTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00223A',
        marginTop: 30,
        marginBottom: 15,
        marginLeft: 20
    },
    evidenceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: '#005792', // Highlight card
    },
    evidenceCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        flexWrap: 'wrap', // Allow content to wrap
    },
    evidenceCardTypeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00223A',
        flexShrink: 1, // Allow text to shrink
        marginRight: 5,
    },
    evidenceCardImageNameText: {
        fontSize: 13,
        color: '#555555',
        flexShrink: 1,
        marginRight: 5,
    },
    evidenceCardLocationText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 5,
    },
    evidenceCardDescriptionText: {
        fontSize: 13,
        color: '#444444',
    },
    evidenceCardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainSaveButton: {
        backgroundColor: '#AB0535', // Dark blue for main save
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        marginLeft: 18,
        marginRight:18
    },
});