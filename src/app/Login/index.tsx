import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { style } from "./style";
import Logo from "@/assets/peri_logo.png";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";

export function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert(
        "Erro no login",
        error.response?.data?.message || "Erro ao fazer login. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
        <Text style={style.titulo}>Seja bem-vindo ao Peridental!</Text>
        <Text>Na aba abaixo, preencha seus dados.</Text>
      </View>

      <View style={style.user}>
        <MaterialIcons name="person" size={24} color="#999" />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={style.password}>
        <MaterialIcons name="lock" size={24} color="#999" />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={[style.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={style.textButton}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
