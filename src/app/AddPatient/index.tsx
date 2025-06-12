import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { patientService } from "@/services/patientService";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { CreatePatientData, FormErrors } from "@/types/patient";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import { caseService } from "@/services/caseService";

type AddPatientScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddPatient"
>;

type AddPatientScreenRouteProp = RouteProp<RootStackParamList, "AddPatient">;

export function AddPatient() {
  const navigation = useNavigation<AddPatientScreenNavigationProp>();
  const route = useRoute<AddPatientScreenRouteProp>();
  const caseId = route.params?.caseId;

  const [step, setStep] = useState<"select_case" | "patient_form">(
    "select_case"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [cases, setCases] = useState<Array<{ _id: string; title: string }>>([]);
  const [selectedCase, setSelectedCase] = useState<string | undefined>(caseId);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nic, setNic] = useState("");
  const [idade, setIdade] = useState("");
  const [selectedEtnia, setSelectedEtnia] = useState<string | undefined>(
    undefined
  );
  const [selectedSexo, setSelectedSexo] = useState<
    "Masculino" | "Feminino" | "Outro" | undefined
  >(undefined);
  const [rg, setRg] = useState("");
  const [enderecoCompleto, setEnderecoCompleto] = useState("");
  const [anotacoesAnatomicas, setAnotacoesAnatomicas] = useState("");
  const [odontograma, setOdontograma] = useState<string>("");

  const [showIdadePicker, setShowIdadePicker] = useState(false);
  const [showSexoPicker, setShowSexoPicker] = useState(false);
  const [showEtniaPicker, setShowEtniaPicker] = useState(false);

  useEffect(() => {
    if (caseId) {
      setStep("patient_form");
    } else {
      setStep("select_case");
      loadCases();
    }
  }, [caseId]);

  const loadCases = async () => {
    try {
      const response = await caseService.getCases();
      if (response.data?.cases) {
        setCases(response.data.cases);
      } else {
        setError("Erro ao carregar casos");
      }
    } catch (err) {
      setError("Erro ao carregar casos");
      console.error(err);
    }
  };

  const handleCaseSelection = () => {
    if (!selectedCase) {
      setError("Selecione um caso para continuar");
      return;
    }
    setStep("patient_form");
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!selectedCase) {
      errors.caseId = "Caso é obrigatório";
      return false;
    }

    if (!nomeCompleto.trim()) {
      errors.nome = "Nome é obrigatório";
    }

    if (!nic.trim()) {
      errors.nic = "NIC é obrigatório";
    } else if (!/^\d+$/.test(nic)) {
      errors.nic = "NIC deve conter apenas números";
    }

    if (!idade) {
      errors.idade = "Idade é obrigatória";
    } else if (parseInt(idade) < 0) {
      errors.idade = "Idade deve ser um número positivo";
    }

    if (!selectedSexo) {
      errors.genero = "Gênero é obrigatório";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      let parsedOdontograma;
      if (odontograma.trim()) {
        try {
          parsedOdontograma = JSON.parse(odontograma);
        } catch (e) {
          setError("Odontograma inválido. Verifique o formato JSON.");
          return;
        }
      }

      setLoading(true);
      setError(null);

      const patientData: CreatePatientData = {
        nome: nomeCompleto,
        nic,
        idade: parseInt(idade),
        genero: selectedSexo!,
        documento: rg || undefined,
        endereco: enderecoCompleto || undefined,
        corEtnia: selectedEtnia,
        anotacoesAnatomicas: anotacoesAnatomicas || undefined,
        odontograma: parsedOdontograma || undefined,
        caseId: selectedCase!,
      };

      const response = await patientService.createPatient(patientData);

      if (response.success) {
        Alert.alert(
          "Sucesso!",
          response.message || "Paciente registrado com sucesso!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        if (response.errors) {
          setFieldErrors(
            response.errors.reduce(
              (acc, err) => ({
                ...acc,
                [err.field]: err.message,
              }),
              {}
            )
          );
        } else {
          setError(
            response.message || response.error || "Erro ao registrar paciente"
          );
        }
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Erro ao registrar paciente";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderIdadePicker = () => {
    if (!showIdadePicker) return null;
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={idade}
          onValueChange={(itemValue) => {
            setIdade(itemValue);
            setShowIdadePicker(false);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="" />
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
            <Picker.Item key={num} label={String(num)} value={String(num)} />
          ))}
        </Picker>
      </View>
    );
  };

  const renderSexoPicker = () => {
    if (!showSexoPicker) return null;
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSexo}
          onValueChange={(itemValue) => {
            setSelectedSexo(itemValue);
            setShowSexoPicker(false);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>
    );
  };

  const renderEtniaPicker = () => {
    if (!showEtniaPicker) return null;
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedEtnia}
          onValueChange={(itemValue) => {
            setSelectedEtnia(itemValue);
            setShowEtniaPicker(false);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Caucasiana" value="Caucasiana" />
          <Picker.Item label="Afro-brasileira" value="Afro-brasileira" />
          <Picker.Item label="Asiática" value="Asiática" />
          <Picker.Item label="Indígena" value="Indígena" />
          <Picker.Item label="Parda" value="Parda" />
        </Picker>
      </View>
    );
  };

  if (step === "select_case") {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Selecione um Caso</Text>

          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.caseSelectionContainer}>
            {cases.map((caseItem) => (
              <TouchableOpacity
                key={caseItem._id}
                style={[
                  styles.caseItem,
                  selectedCase === caseItem._id && styles.selectedCaseItem,
                ]}
                onPress={() => setSelectedCase(caseItem._id)}
              >
                <Text
                  style={[
                    styles.caseItemText,
                    selectedCase === caseItem._id &&
                      styles.selectedCaseItemText,
                  ]}
                >
                  {caseItem.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              !selectedCase && styles.disabledButton,
            ]}
            onPress={handleCaseSelection}
            disabled={!selectedCase}
          >
            <Text style={styles.registerButtonText}>Continuar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Adicionar Novo Paciente</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          style={[styles.inputField, fieldErrors.nome && styles.inputError]}
          placeholder="Nome completo"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
        {fieldErrors.nome && (
          <Text style={styles.fieldError}>{fieldErrors.nome}</Text>
        )}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <TextInput
              style={[styles.inputField, fieldErrors.nic && styles.inputError]}
              placeholder="NIC"
              value={nic}
              onChangeText={setNic}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            {fieldErrors.nic && (
              <Text style={styles.fieldError}>{fieldErrors.nic}</Text>
            )}
          </View>

          <View style={styles.halfWidth}>
            <TouchableOpacity
              style={[
                styles.dropdownButton,
                fieldErrors.idade && styles.inputError,
              ]}
              onPress={() => setShowIdadePicker(!showIdadePicker)}
            >
              <Text style={styles.dropdownButtonText}>
                {idade ? idade : "Idade"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            {renderIdadePicker()}
            {fieldErrors.idade && (
              <Text style={styles.fieldError}>{fieldErrors.idade}</Text>
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <TouchableOpacity
              style={[
                styles.dropdownButton,
                fieldErrors.genero && styles.inputError,
              ]}
              onPress={() => setShowSexoPicker(!showSexoPicker)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedSexo ? selectedSexo : "Sexo"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>
            {renderSexoPicker()}
            {fieldErrors.genero && (
              <Text style={styles.fieldError}>{fieldErrors.genero}</Text>
            )}
          </View>

          <View style={styles.halfWidth}>
            <TextInput
              style={styles.inputField}
              placeholder="RG"
              value={rg}
              onChangeText={setRg}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.dropdownButtoneti}
          onPress={() => setShowEtniaPicker(!showEtniaPicker)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedEtnia ? selectedEtnia : "Etnia"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
        {renderEtniaPicker()}

        <TextInput
          style={styles.inputField}
          placeholder="Endereço completo"
          value={enderecoCompleto}
          onChangeText={setEnderecoCompleto}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />

        <TextInput
          style={[styles.inputField, styles.largeInputField]}
          placeholder="Anotações Anatômicas"
          multiline
          value={anotacoesAnatomicas}
          onChangeText={setAnotacoesAnatomicas}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />

        <TextInput
          style={[styles.inputField, styles.largeInputField]}
          placeholder="Odontograma (formato JSON)"
          multiline
          value={odontograma}
          onChangeText={setOdontograma}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />

        <TouchableOpacity
          style={[styles.registerButton, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
