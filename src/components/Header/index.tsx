import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { MenuModal } from "@/components/MenuModal";

export function Header() {
  const [menuVisible, setMenuVisible] = useState(false); // controle do modal

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={require("@/assets/logo.png")} style={styles.logo} />
          <Text style={styles.name}>Peridental</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={37} color="#fff" marginTop={30} />
        </TouchableOpacity>
      </View>
      {/* Modal de Menu */}
      <MenuModal
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}
