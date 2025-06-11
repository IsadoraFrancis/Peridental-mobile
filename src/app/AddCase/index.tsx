import { View, Text, TouchableOpacity, FlatList, TextInput, Image, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react"; // Importar useCallback
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from 'expo-document-picker';
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

interface Evidence {
    id: string;
    type: string;
    imageUri: string | null;
    imageName: string | null;
    location: string;
    description: string;
}

interface Report {
    id: string;
    type: string;
    fileUri: string | null;
    fileName: string | null;
    description: string;
}

export function AddCase() {
    const [descricao, setDescricao] = useState('');
    const [expanded1, setExpanded1] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expandedEvidence, setExpandedEvidence] = useState(false);
    const [expandedReport, setExpandedReport] = useState(false);

    const [selected1, setSelected1] = useState("Tipo");
    const [selected2, setSelected2] = useState("Data");
    const [selected3, setSelected3] = useState("Status");
    const [selectedEvidence, setSelectedEvidence] = useState("Selecionar");
    const [selectedReportType, setSelectedReportType] = useState("Tipo do Laudo");

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState('');
    const [evidenceDescription, setEvidenceDescription] = useState('');

    const [evidences, setEvidences] = useState<Evidence[]>([]);
    const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null);

    const [reportFile, setReportFile] = useState<string | null>(null);
    const [reportFileName, setReportFileName] = useState<string | null>(null);
    const [reportDescription, setReportDescription] = useState('');
    const [reports, setReports] = useState<Report[]>([]);
    const [editingReportId, setEditingReportId] = useState<string | null>(null);


    const options1 = [
        { label: "Acidente" },
        { label: "Identificação" },
        { label: "Criminal" },
    ];

    const options3 = [
        { label: "Aberto" },
        { label: "Finalizado" },
        { label: "Arquivado" },
    ];

    const evidenceOptions = [
        { label: "Texto" },
        { label: "Imagem" },
    ];

    const reportTypeOptions = [
        { label: "Laudo pericial" },
        { label: "Relatorio tecnico" },
        { label: "Parecer odontologico" },
    ];

    const handleDateChange = (event: any, date?: Date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            const formatted = date.toLocaleDateString("pt-BR");
            setSelected2(formatted);
        }
    };

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

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: false,
        });

        if (result.canceled === false) {
            setReportFile(result.assets[0].uri);
            setReportFileName(result.assets[0].name);
        }
    };

    // Tornar getLocation um useCallback para evitar recriação desnecessária
    const getLocation = useCallback(async () => {
        Alert.alert("Obtendo localização", "Aguarde enquanto tentamos obter sua localização...");
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Permissão negada", "Não foi possível obter a localização. Por favor, conceda a permissão nas configurações do seu dispositivo.");
            setLocation('Permissão negada');
            return;
        }

        try {
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLocation(`Lat: ${loc.coords.latitude.toFixed(5)}, Lon: ${loc.coords.longitude.toFixed(5)}`);
        } catch (error) {
            console.error("Erro ao obter a localização:", error);
            Alert.alert("Erro de Localização", "Não foi possível obter a localização exata. Verifique seu GPS e conexão com a internet.");
            setLocation('Erro ao obter localização');
        }
    }, []); // Sem dependências para useCallback, pois só depende de funções de API

    // Usar useFocusEffect para chamar getLocation sempre que a tela estiver focada
    useFocusEffect(
        useCallback(() => {
            getLocation();
        }, [getLocation])
    );

    const clearEvidenceForm = () => {
        setSelectedEvidence("Selecionar");
        setImage(null);
        setLocation('');
        setEvidenceDescription('');
        setEditingEvidenceId(null);
        getLocation(); // Chamar getLocation ao limpar o formulário para re-tentar
    };

    const clearReportForm = () => {
        setSelectedReportType("Tipo do Laudo");
        setReportFile(null);
        setReportFileName(null);
        setReportDescription('');
        setEditingReportId(null);
    };

    const handleAddOrUpdateEvidence = () => {
        if (!selectedEvidence || selectedEvidence === "Selecionar" || !evidenceDescription) {
            Alert.alert("Erro", "Por favor, preencha o tipo e a descrição da evidência.");
            return;
        }

        const newEvidence: Evidence = {
            id: editingEvidenceId || Date.now().toString(),
            type: selectedEvidence,
            imageUri: image,
            imageName: (image?.split('/').pop() || null),
            location: location,
            description: evidenceDescription,
        };

        if (editingEvidenceId) {
            setEvidences(evidences.map(ev => ev.id === editingEvidenceId ? newEvidence : ev));
        } else {
            setEvidences([...evidences, newEvidence]);
        }
        clearEvidenceForm();
    };

    const handleAddOrUpdateReport = () => {
        if (!selectedReportType || selectedReportType === "Tipo do Laudo" || !reportDescription) {
            Alert.alert("Erro", "Por favor, preencha o tipo e a descrição do laudo/documento.");
            return;
        }

        const newReport: Report = {
            id: editingReportId || Date.now().toString(),
            type: selectedReportType,
            fileUri: reportFile,
            fileName: reportFileName,
            description: reportDescription,
        };

        if (editingReportId) {
            setReports(reports.map(rep => rep.id === editingReportId ? newReport : rep));
        } else {
            setReports([...reports, newReport]);
        }
        clearReportForm();
    };


    const handleEditEvidence = (evidence: Evidence) => {
        setEditingEvidenceId(evidence.id);
        setSelectedEvidence(evidence.type);
        setImage(evidence.imageUri);
        setLocation(evidence.location);
        setEvidenceDescription(evidence.description);

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

    const handleEditReport = (report: Report) => {
        setEditingReportId(report.id);
        setSelectedReportType(report.type);
        setReportFile(report.fileUri);
        setReportFileName(report.fileName);
        setReportDescription(report.description);
    };

    const handleDeleteReport = (id: string) => {
        Alert.alert(
            "Excluir Laudo/Documento",
            "Tem certeza que deseja excluir este laudo/documento?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => setReports(reports.filter(rep => rep.id !== id)) }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <Header />
                <Text style={styles.titulo}>Adicionar Novo Caso</Text>

                <View style={styles.buttonRow}>
                    {/* Tipo de Caso */}
                    <View style={{ zIndex: expanded1 ? 100 : 1 }}>
                        <TouchableOpacity
                            style={[styles.dropButton, styles.fixedButton]}
                            onPress={() => {
                                setExpanded1(!expanded1);
                                setExpanded3(false);
                                setShowDatePicker(false);
                                setExpandedEvidence(false);
                                setExpandedReport(false);
                            }}
                        >
                            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">{selected1}</Text>
                            <AntDesign name="down" size={16} color="#fff" style={{ marginLeft: 30 }} />
                        </TouchableOpacity>
                        {expanded1 && (
                            <View style={styles.dropdownList}>
                                {options1.map((item) => (
                                    <TouchableOpacity
                                        key={item.label}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelected1(item.label);
                                            setExpanded1(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Data */}
                    <View>
                        <TouchableOpacity
                            style={[styles.dropButton, styles.fixedButton]}
                            onPress={() => {
                                setShowDatePicker(true);
                                setExpanded1(false);
                                setExpanded3(false);
                                setExpandedEvidence(false);
                                setExpandedReport(false);
                            }}
                        >
                            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">{selected2}</Text>
                            <AntDesign name="down" size={16} color="#fff" style={{ marginLeft: 30 }} />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    {/* Status */}
                    <View style={{ zIndex: expanded3 ? 100 : 1 }}>
                        <TouchableOpacity
                            style={[styles.dropButton, styles.fixedButton]}
                            onPress={() => {
                                setExpanded3(!expanded3);
                                setExpanded1(false);
                                setShowDatePicker(false);
                                setExpandedEvidence(false);
                                setExpandedReport(false);
                            }}
                        >
                            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">{selected3}</Text>
                            <AntDesign name="down" size={16} color="#fff" style={{ marginLeft: 20 }} />
                        </TouchableOpacity>
                        {expanded3 && (
                            <View style={styles.dropdownList}>
                                {options3.map((item) => (
                                    <TouchableOpacity
                                        key={item.label}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelected3(item.label);
                                            setExpanded3(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                {/* Nome do Responsável e Descrição do Caso */}
                <Text style={styles.caseTitulo}> Nome do Responsável </Text>
                <TextInput style={styles.inputPequeno} />

                <Text style={styles.caseTituloR}> Descrição do Caso </Text>
                <TextInput
                    style={styles.inputGrande}
                    multiline
                    value={descricao}
                    onChangeText={setDescricao}
                />

                {/* Seção de Evidências */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Tipo de Evidência:</Text>
                    <TouchableOpacity
                        style={styles.evidenceSelectionButton}
                        onPress={() => {
                            setExpandedEvidence(!expandedEvidence);
                            setExpanded1(false);
                            setExpanded3(false);
                            setShowDatePicker(false);
                            setExpandedReport(false); // Close report dropdown
                        }}
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
                    <Text style={styles.evidenceTitle}>Descrição de Evidências</Text>
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

                {/* Nova Seção de Laudos e Documentações */}
                <View style={styles.evidenceSection}>
                    <Text style={styles.evidenceTitle}>Laudos e Documentações:</Text>
                    <TouchableOpacity
                        style={styles.evidenceSelectionButton}
                        onPress={() => {
                            setExpandedReport(!expandedReport);
                            setExpanded1(false);
                            setExpanded3(false);
                            setShowDatePicker(false);
                            setExpandedEvidence(false);
                        }}
                    >
                        <Text style={styles.evidenceSelectionText}>{selectedReportType}</Text>
                        <AntDesign name="down" size={16} color="#fff" style={{ marginLeft: 30 }} />
                    </TouchableOpacity>
                    {expandedReport && (
                        <View style={styles.evidenceDropdownList}>
                            {reportTypeOptions.map((item) => (
                                <TouchableOpacity
                                    key={item.label}
                                    style={styles.evidenceDropdownItem}
                                    onPress={() => {
                                        setSelectedReportType(item.label);
                                        setExpandedReport(false);
                                    }}
                                >
                                    <Text style={styles.evidenceDropdownText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}