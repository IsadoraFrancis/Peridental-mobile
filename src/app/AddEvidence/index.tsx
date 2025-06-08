import { View, Text, TouchableOpacity, FlatList, TextInput, Image, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
// Importe expo-document-picker se você planeja usá-lo em algum momento.
// import * as DocumentPicker from "expo-document-picker"; 

// Define uma interface para a estrutura da sua evidência para melhor segurança de tipo
interface Evidence {
    id: string; // Identificador único para cada evidência
    type: string;
    imageUri: string | null;
    imageName: string | null;
    location: string;
    description: string;
    caseName: string; // Re-adicionado caseName à interface Evidence
}

export function AddEvidence() {
    const [expandedEvidence, setExpandedEvidence] = useState(false);
    const [selectedEvidence, setSelectedEvidence] = useState("Selecionar");

    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState('');
    const [evidenceDescription, setEvidenceDescription] = useState(''); // Estado para a descrição da evidência
    const [caseName, setCaseName] = useState(''); // Novo estado para o nome do caso

    const [evidences, setEvidences] = useState<Evidence[]>([]); // Estado para armazenar todas as evidências adicionadas
    const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null); // Estado para rastrear qual evidência está sendo editada

    const evidenceOptions = [
        { label: "Texto" },
        { label: "Imagem" },
    ];

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocation('Permissão negada');
            return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(`Lat: ${loc.coords.latitude.toFixed(5)}, Lon: ${loc.coords.longitude.toFixed(5)}`);
    };

    useEffect(() => {
        getLocation();
    }, []);

    const clearEvidenceForm = () => {
        setSelectedEvidence("Selecionar");
        setImage(null);
        setLocation('');
        setEvidenceDescription('');
        setCaseName(''); // Limpar nome do caso ao limpar o formulário
        setEditingEvidenceId(null);
        getLocation(); // Buscar localização novamente ao limpar o formulário
    };

    const handleAddOrUpdateEvidence = () => {
        // Validação agora inclui caseName
        if (!selectedEvidence || selectedEvidence === "Selecionar" || !evidenceDescription || !caseName) {
            Alert.alert("Erro", "Por favor, preencha o tipo, o nome do caso e a descrição da evidência.");
            return;
        }

        const newEvidence: Evidence = {
            id: editingEvidenceId || Date.now().toString(), // Usar ID existente se estiver editando, caso contrário, gerar um novo
            type: selectedEvidence,
            imageUri: image,
            imageName: (image?.split('/').pop() || null),
            location: location,
            description: evidenceDescription,
            caseName: caseName, // Adicionar nome do caso ao objeto de evidência
        };

        if (editingEvidenceId) {
            // Atualizar evidência existente
            setEvidences(evidences.map(ev => ev.id === editingEvidenceId ? newEvidence : ev));
        } else {
            // Adicionar nova evidência
            setEvidences([...evidences, newEvidence]);
        }
        clearEvidenceForm();
    };

    const handleEditEvidence = (evidence: Evidence) => {
        setEditingEvidenceId(evidence.id);
        setSelectedEvidence(evidence.type);
        setImage(evidence.imageUri);
        setLocation(evidence.location);
        setEvidenceDescription(evidence.description);
        setCaseName(evidence.caseName); // Definir nome do caso para edição
    };

    const handleDeleteEvidence = (id: string) => {
        Alert.alert(
            "Excluir Evidência",
            "Tem certeza que deseja excluir esta evidência?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => setEvidences(evidences.filter(ev => ev.id !== id)) }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={styles.contentContainer}> 
                <Text style={styles.titulo}>Adicionar Evidências</Text>

                {/* Seção de Adicionar Evidências */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Tipo de Evidência:</Text>
                    <TouchableOpacity
                        style={styles.evidenceSelectionButton}
                        onPress={() => setExpandedEvidence(!expandedEvidence)}
                    >
                        <Text style={styles.evidenceSelectionText}>{selectedEvidence}</Text>
                        <AntDesign name="down" size={16} color="#fff" style={{ marginLeft: 30 }} />
                    </TouchableOpacity>
                    {expandedEvidence && (
                        <View style={styles.evidenceDropdownList}>
                            {evidenceOptions.map((item) => (
                                <TouchableOpacity
                                    key={item.label}
                                    style={styles.evidenceDropdownItem}
                                    onPress={() => {
                                        setSelectedEvidence(item.label);
                                        setExpandedEvidence(false);
                                    }}
                                >
                                    <Text style={styles.evidenceDropdownText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Nome do Caso (TextInput) */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Nome do Caso:</Text>
                    <TextInput
                        style={styles.evidenceLocationInput}
                        value={caseName}
                        onChangeText={setCaseName}
                    />
                </View>

                {/* Upload de Imagem */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Upload de Imagem:</Text>
                    <View style={styles.evidenceButtonRow}>
                        <TouchableOpacity style={[styles.evidenceUploadButton, { flex: 1 }]} onPress={pickImage}>
                            <Text style={styles.evidenceUploadText}>Selecionar</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity style={[styles.evidenceUploadButton, { flex: 1 }]} onPress={takePhoto}>
                            <Text style={styles.evidenceUploadText}>Câmera</Text>
                        </TouchableOpacity>
                    </View>
                    {image && (
                        <View style={styles.evidenceImageContainer}>
                            <Image source={{ uri: image }} style={styles.evidenceImage} />
                            <Text style={styles.evidenceImageName}>{image.split('/').pop()}</Text>
                        </View>
                    )}
                </View>

                {/* Localização */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Localização</Text>
                    <TextInput
                        style={styles.evidenceLocationInput}
                        value={location}
                        editable={false}
                    />
                </View>

                {/* Descrição de Evidências */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Descrição da Evidência</Text>
                    <TextInput
                        style={styles.evidenceDescriptionInput}
                        multiline
                        value={evidenceDescription}
                        onChangeText={setEvidenceDescription}
                    />
                </View>

                <TouchableOpacity style={styles.saveEvidenceButton} onPress={handleAddOrUpdateEvidence}>
                    <Text style={styles.saveButtonText}>{editingEvidenceId ? "Atualizar Evidência" : "Adicionar Evidência"}</Text>
                </TouchableOpacity>

                {/* Lista de Evidências Adicionadas */}
                <Text style={styles.evidenceListTitle}>Evidências Adicionadas:</Text>
                {evidences.map((item) => (
                    <View key={item.id} style={styles.evidenceCard}>
                        <View style={styles.evidenceCardHeader}>
                            <Text style={styles.evidenceCardTypeText}>Tipo: {item.type}</Text>
                            <Text style={styles.evidenceCardImageNameText}>Caso: {item.caseName}</Text> {/* Exibir nome do caso */}
                            <Text style={styles.evidenceCardImageNameText}>Imagem: {item.imageName || 'Nenhuma'}</Text>
                            <View style={styles.evidenceCardActions}>
                                <TouchableOpacity onPress={() => handleEditEvidence(item)}>
                                    <Feather name="edit" size={20} color="#00223A" style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteEvidence(item.id)}>
                                    <AntDesign name="delete" size={20} color="#AB0535" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.evidenceCardLocationText}>Localização: {item.location}</Text>
                        <Text style={styles.evidenceCardDescriptionText}>Descrição: {item.description}</Text>
                    </View>
                ))}

                {/* O botão principal de salvar para a tela, se você quiser um para salvar todas as evidências */}
                <TouchableOpacity style={styles.mainSaveButton} onPress={() => Alert.alert("Salvar Evidências", "Todas as evidências foram salvas.")}>
                    <Text style={styles.saveButtonText}>Salvar Evidências</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}