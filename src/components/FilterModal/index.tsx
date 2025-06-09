import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function FilterModal({ isVisible, onClose }: FilterModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClearFilters = () => {
    setSelectedOption(null);
    // Adicionar lógica para limpar filtros reais, se houver
    onClose();
  };

  const handleSearch = () => {
    // Adicionar lógica para aplicar filtros reais, se houver
    console.log("Pesquisar por:", selectedOption);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose} // Fecha o modal ao clicar fora
      >
        <View style={styles.filterContainer}>
          <Text style={styles.title}>Filtrar por</Text>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setSelectedOption("Nome do Responsável")}
          >
            <Ionicons
              name={
                selectedOption === "Nome do Responsável"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color="#fff"
            />
            <Text style={styles.optionText}>Nome do Responsável</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setSelectedOption("Nº do Caso")}
          >
            <Ionicons
              name={
                selectedOption === "Nº do Caso"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color="#fff"
            />
            <Text style={styles.optionText}>Nº do Caso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setSelectedOption("Especialidade")}
          >
            <Ionicons
              name={
                selectedOption === "Especialidade"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color="#fff"
            />
            <Text style={styles.optionText}>Especialidade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setSelectedOption("Data")}
          >
            <Ionicons
              name={
                selectedOption === "Data"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color="#fff"
            />
            <Text style={styles.optionText}>Data</Text>
          </TouchableOpacity>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>Limpar Filtros</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Pesquisar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
