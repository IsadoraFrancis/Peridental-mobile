import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
    isActive: boolean;
    avatar?: string;
  };
}

type UserCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Access"
>;

export function UserCard({ user }: UserCardProps) {
  const navigation = useNavigation<UserCardNavigationProp>();

  const handleViewProfile = () => {
    navigation.navigate("Profile", {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        isActive: user.isActive,
        avatar: user.avatar || "",
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          user.avatar
            ? { uri: user.avatar }
            : require("@/assets/user-placeholder.jpg")
        }
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text
          style={[
            styles.userStatus,
            { color: user.isActive ? "#4CAF50" : "#F44336" },
          ]}
        >
          {user.isActive ? "Ativo" : "Inativo"}
        </Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={handleViewProfile}>
        <Text style={styles.viewButtonText}>Visualizar</Text>
        <Ionicons name="eye-outline" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
