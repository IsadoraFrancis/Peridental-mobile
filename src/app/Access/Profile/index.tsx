import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Access: undefined;
  Profile: { user: { id: string; name: string; role: string; avatar: string } };
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export function Profile() {
  const [activeTab, setActiveTab] = useState("Atividade");
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute();
  const { user } = route.params as RootStackParamList["Profile"];

  // Dados simulados para as seções
  const activities = [
    {
      id: "1",
      date: "22/05/2025",
      description: "Fotografias intraorais e radiografias odontológicas.",
    },
    {
      id: "2",
      date: "20/05/2025",
      description: "Relatório de uma nova vítima.",
    },
    {
      id: "3",
      date: "17/05/2025",
      description: "Relatório de uma nova vítima.",
    },
    {
      id: "4",
      date: "08/05/2025",
      description: "Fotografias de arco dentário deteriorado.",
    },
  ];

  const generalInfo = {
    fullName: "Patrícia Pires Marques de Oliveira",
    position: "Assistente Odontológica",
    age: "24 anos",
    about: `Patrícia Pires Marques de Oliveira é uma assistente odontológica de 24 anos, dedicada e comprometida com o bem-estar dos pacientes. Ela desempenha um papel fundamental no apoio à equipe de saúde bucal, auxiliando nas tarefas clínicas e administrativas. Com um perfil organizado e atencioso, Patrícia busca proporcionar uma experiência positiva e tranquila aos pacientes, garantindo um ambiente de trabalho eficiente e acolhedor.`,
  };

  const historyData = [
    {
      id: "1",
      date: "12/09/2025",
      description:
        "2. Campanha de Prevenção Bucal - Ela coordenou uma campanha educativa de prevenção bucal para...",
    },
    {
      id: "2",
      date: "12/09/2025",
      description:
        "Gestão de Estoque de Materiais - Patrícia implementou um sistema de controle de estoque digital.",
    },
    {
      id: "3",
      date: "12/09/2025",
      description:
        "2. Campanha de Prevenção Bucal - Ela coordenou uma campanha educativa de prevenção bucal para...",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Atividade":
        return (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.tabButtonText}>Atividades Recentes</Text>
            {activities.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.date}</Text>
                <Text style={styles.cardText}>{item.description}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Detalhes</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>Ver tudo</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      case "Informacoes":
        return (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.tabButtonText}>Informações Gerais</Text>
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nome completo:</Text>
                <Text style={styles.infoValue}>{generalInfo.fullName}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Cargo:</Text>
                <Text style={styles.infoValue}>{generalInfo.position}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Idade:</Text>
                <Text style={styles.infoValue}>{generalInfo.age}</Text>
              </View>
            </View>
            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>Sobre</Text>
              <Text style={styles.aboutText}>{generalInfo.about}</Text>
            </View>
          </ScrollView>
        );
      case "Historico":
        return (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.tabButtonText}>Histórico</Text>
            {historyData.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyDescription}>
                  {item.description}
                </Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Detalhes</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>Ver tudo</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Gestão de Acesso</Text>
      <View style={styles.header}>
        <Image
          source={
            user.avatar
              ? { uri: user.avatar }
              : require("@/assets/user-placeholder.jpg")
          }
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Atividade" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Atividade")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Atividade" && styles.activeTabButtonText,
            ]}
          >
            Atividade
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Informacoes" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Informacoes")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Informacoes" && styles.activeTabButtonText,
            ]}
          >
            Informações
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Historico" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Historico")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Historico" && styles.activeTabButtonText,
            ]}
          >
            Histórico
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}
