// app/AddPaciente.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,

} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { Header } from "@/components/Header";

export function AddPaciente() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nic, setNic] = useState('');
  const [idade, setIdade] = useState('');
  const [selectedEtnia, setSelectedEtnia] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [rg, setRg] = useState('');
  const [enderecoCompleto, setEnderecoCompleto] = useState('');
  const [anotacoesAnatomicas, setAnotacoesAnatomicas] = useState('');
  const [odontograma, setOdontograma] = useState('');

  return (
    <SafeAreaView style={styles.container}> {/* AGORA USE 'styles' */}
      {/* Header - Simples para este exemplo */}
       <Header />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Adicionar Novo Paciente</Text>

        <TextInput
          style={styles.inputField}
          placeholder="Nome completo"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.inputField, styles.halfWidth]}
            placeholder="NIC"
            value={nic}
            onChangeText={setNic}
            keyboardType="numeric"
          />

          <TouchableOpacity style={[styles.dropdownButton, styles.halfWidth]}>
            <Text style={styles.dropdownButtonText}>{idade ? idade : "Idade"}</Text>
            <Picker
              selectedValue={idade}
              onValueChange={(itemValue) => setIdade(itemValue)}
              style={styles.hiddenPicker}
            >
              <Picker.Item label="Selecione" value="" />
              {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (
                <Picker.Item key={num} label={String(num)} value={String(num)} />
              ))}
            </Picker>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.dropdownButton, styles.halfWidth]}>
            <Text style={styles.dropdownButtonText}>{selectedSexo ? selectedSexo : "Sexo"}</Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
            <Picker
              selectedValue={selectedSexo}
              onValueChange={(itemValue) => setSelectedSexo(itemValue)}
              style={styles.hiddenPicker}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </TouchableOpacity>

          <TextInput
            style={[styles.inputField, styles.halfWidth]}
            placeholder="RG"
            value={rg}
            onChangeText={setRg}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.dropdownButtoneti}>
          <Text style={styles.dropdownButtonText}>{selectedEtnia ? selectedEtnia : "Etnia"}</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
          <Picker
            selectedValue={selectedEtnia}
            onValueChange={(itemValue) => setSelectedEtnia(itemValue)}
            style={styles.hiddenPicker}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Caucasiana" value="Caucasiana" />
            <Picker.Item label="Afro-brasileira" value="Afro-brasileira" />
            <Picker.Item label="Asiática" value="Asiática" />
            <Picker.Item label="Indígena" value="Indígena" />
            <Picker.Item label="Parda" value="Parda" />
          </Picker>
        </TouchableOpacity>

        <TextInput
          style={styles.inputField}
          placeholder="Endereço completo"
          value={enderecoCompleto}
          onChangeText={setEnderecoCompleto}
        />

        <TextInput
          style={[styles.inputField, styles.largeInputField]}
          placeholder="Anotações Anatômicas"
          multiline
          value={anotacoesAnatomicas}
          onChangeText={setAnotacoesAnatomicas}
        />

        <TextInput
          style={[styles.inputField, styles.largeInputField]}
          placeholder="Odontograma"
          multiline
          value={odontograma}
          onChangeText={setOdontograma}
        />

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}