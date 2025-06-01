import { View, Text, Image } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";

type RootStackParamList = {
  Hello: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Hello">;

export function Hello() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} />
      <Text style={styles.text}>Peridental</Text>
    </View>
  );
}
