import React from "react";
import { View, Text, Pressable } from "react-native";
import { Patient } from "@/types/patient";
import { styles } from "./styles";

interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
}

export function PatientCard({ patient, onPress }: PatientCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{patient.nome}</Text>
        <Text style={styles.age}>{patient.idade} anos</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.description}>NIC: {patient.nic}</Text>
        <Text style={styles.description}>Gênero: {patient.genero}</Text>
        {patient.documento && (
          <Text style={styles.description}>RG: {patient.documento}</Text>
        )}
      </View>
    </Pressable>
  );
}
