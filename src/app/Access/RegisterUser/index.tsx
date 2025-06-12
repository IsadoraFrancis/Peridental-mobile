import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import { Header } from "@/components/Header";
import { styles } from "./styles";
import api from "@/services/api";
import { Ionicons } from "@expo/vector-icons";

type RegisterUserNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterUser"
>;

interface FormData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "perito" | "assistente";
}

const roles = [
  { label: "Perito", value: "perito" },
  { label: "Assistente", value: "assistente" },
  { label: "Administrador", value: "admin" },
];

export function RegisterUser() {
  const navigation = useNavigation<RegisterUserNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "perito",
  });

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.password) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }

      if (formData.password.length < 6) {
        Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres");
        return;
      }

      setLoading(true);
      await api.post("/api/users/register", formData);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.msg || "Não foi possível cadastrar o usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: "admin" | "perito" | "assistente") => {
    setFormData((prev) => ({ ...prev, role }));
    setShowRolePicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Cadastrar Colaborador</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Função</Text>
          <TouchableOpacity
            style={styles.roleSelector}
            onPress={() => setShowRolePicker(true)}
          >
            <Text style={styles.roleSelectorText}>
              {roles.find((r) => r.value === formData.role)?.label}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#00223A" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showRolePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRolePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione a Função</Text>
              <TouchableOpacity onPress={() => setShowRolePicker(false)}>
                <Ionicons name="close" size={24} color="#00223A" />
              </TouchableOpacity>
            </View>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.value}
                style={[
                  styles.roleOption,
                  formData.role === role.value && styles.roleOptionSelected,
                ]}
                onPress={() =>
                  handleRoleSelect(
                    role.value as "admin" | "perito" | "assistente"
                  )
                }
              >
                <Text
                  style={[
                    styles.roleOptionText,
                    formData.role === role.value &&
                      styles.roleOptionTextSelected,
                  ]}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
