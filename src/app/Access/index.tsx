import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { UserCard } from "@/components/UserCard";
import { FilterModal } from "@/components/FilterModal";

export function Access() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  // Dados mock para os cards de usuário
  const users = [
    { id: "1", name: "Luíza Souza", role: "Assistente", avatar: "" },
    { id: "2", name: "Milena Passos", role: "Perita", avatar: "" },
    { id: "3", name: "Juan Paiva", role: "Assistente", avatar: "" },
    { id: "4", name: "Sheila Lins", role: "Administradora", avatar: "" },
    { id: "5", name: "Bruno Silva", role: "Perito", avatar: "" },
    { id: "6", name: "Diego Bastos", role: "Administrador", avatar: "" },
    { id: "7", name: "Maria Isis", role: "Assistente", avatar: "" },
    { id: "8", name: "André Vitor", role: "Perito", avatar: "" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Gestão de Acesso</Text>
      <Input onFilterPress={toggleFilterModal} />{" "}
      {/* Passa a função para o Input */}
      <Text style={styles.recentViewedText}>Visto Recentemente</Text>
      <ScrollView style={styles.cardsContainer}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>Ver tudo</Text>
      </TouchableOpacity>
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
      />
    </SafeAreaView>
  );
}
