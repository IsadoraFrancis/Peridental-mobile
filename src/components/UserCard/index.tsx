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
    avatar: string; // Pode ser uma URL ou um caminho local
  };
}

type UserCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Access"
>;

export function UserCard({ user }: UserCardProps) {
  const navigation = useNavigation<UserCardNavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        source={
          user.avatar
            ? { uri: user.avatar }
            : require("@/assets/user-placeholder.jpg")
        } // Placeholder se não houver avatar
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate("Profile", { user: user })}
      >
        <Text style={styles.viewButtonText}>Visualizar</Text>
        <Ionicons name="eye-outline" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
