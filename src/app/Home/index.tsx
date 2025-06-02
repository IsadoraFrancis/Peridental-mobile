import { View, SafeAreaView, Text, Image } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";

export function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Input />
    </SafeAreaView>
  );
}
