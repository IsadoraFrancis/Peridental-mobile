import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { UserCard } from "@/components/UserCard";
import { FilterModal } from "@/components/FilterModal";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  isActive: boolean;
}

type AccessNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Access"
>;

export function Access() {
  const navigation = useNavigation<AccessNavigationProp>();
  const { user } = useAuth();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadUsers();
    });

    return unsubscribe;
  }, [navigation]);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleRegisterUser = () => {
    navigation.navigate("RegisterUser");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Gestão de Acesso</Text>

      {isAdmin && (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegisterUser}
        >
          <Text style={styles.registerButtonText}>Cadastrar Colaborador</Text>
        </TouchableOpacity>
      )}

      <Input onFilterPress={toggleFilterModal} />

      <Text style={styles.recentViewedText}>Usuários</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={styles.loading}
        />
      ) : (
        <ScrollView style={styles.cardsContainer}>
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={{
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
                isActive: user.isActive,
                avatar: undefined,
              }}
            />
          ))}
        </ScrollView>
      )}

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
      />
    </SafeAreaView>
  );
}
