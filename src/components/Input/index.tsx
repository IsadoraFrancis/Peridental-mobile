import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FilterModal } from "@/components/FilterModal";

interface InputProps extends TextInputProps {
  onFilterPress?: () => void;
}

export function Input({ onFilterPress, ...rest }: InputProps) {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
    onFilterPress?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={24} color="#8A879C" />
        <TextInput style={styles.input} placeholder="Pesquisar" {...rest} />
        <TouchableOpacity onPress={toggleFilterModal}>
          <Ionicons name="options-outline" size={24} color="#8A879C" />
        </TouchableOpacity>
      </View>

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
      />
    </View>
  );
}
