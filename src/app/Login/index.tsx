import React from 'react';
import { Text, View, Image, TextInput,TouchableOpacity } from 'react-native';
import {style} from "./style"
import Logo from '@/assets/peri_logo.png';
import { MaterialIcons } from '@expo/vector-icons';

export function Login({ navigation }: any) {
  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode='contain'/>
        <Text style={style.titulo}>Seja bem-vindo ao Peridental!</Text>
        <Text>Na aba abaixo, preencha seus dados.</Text>
      </View>

      <View style={style.user}>
        <MaterialIcons name="person" size={24} color="#999" />
        <TextInput style={{flex: 1}} placeholder='Nome do usuário'/>
      </View>

      <View style={style.password}>
        <MaterialIcons name="lock" size={24} color="#999"/>
        <TextInput style={{flex: 1}} placeholder='Senha'/>
      </View>
        <TouchableOpacity style = {style.button} onPress={() => navigation.navigate('AddCase')}>
          <Text style={style.textButton} > Entrar </Text>
        </TouchableOpacity>
    </View>
  );
}
