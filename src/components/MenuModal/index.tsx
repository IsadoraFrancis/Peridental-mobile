import React from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Access: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function MenuModal({ isVisible, onClose }: MenuModalProps) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.menuContainer}>
          <View style={styles.menuHeader}>
            <Ionicons name="menu" size={24} color="#fff" />
            <Text style={styles.menuTitle}>Menu</Text>
          </View>

          <View style={styles.userInfoSection}>
            <Text style={styles.welcomeText}>Bem vindo, user!</Text>
            <Text style={styles.userIdText}>id</Text>
            <TouchableOpacity
              onPress={() => console.log("Alterar informações")}
            >
              <Text style={styles.changeInfoText}>Alterar informações</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItemsContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Home");
                onClose();
              }}
            >
              <Text style={styles.menuItemText}>Visão Geral</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => console.log("Gestão de Casos")}
            >
              <Text style={styles.menuItemText}>Gestão de Casos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => console.log("Pacientes")}
            >
              <Text style={styles.menuItemText}>Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => console.log("Laudos")}
            >
              <Text style={styles.menuItemText}>Laudos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => console.log("Cruzamento de dados")}
            >
              <Text style={styles.menuItemText}>Cruzamento de dados</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Access");
                onClose();
              }}
            >
              <Text style={styles.menuItemText}>Gestão de Acesso</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => console.log("Sair")}
          >
            <Ionicons name="log-out-outline" size={24} color="#B30E2F" />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
