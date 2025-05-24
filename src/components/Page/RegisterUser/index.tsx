import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';
import { BackButtonLogin } from '../LoginUser';

export default function RegisterUser() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <ImageBackground source={require('../../../assets/Backgoundlogin.png')} style={styles.bg} resizeMode="cover">
      <BackButtonLogin />
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('../../../assets/Decoration-Paw.png')} resizeMode="contain" />
          <Text style={styles.title}>PetTracker</Text>
          <Text style={styles.label}>Nome</Text>
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, { marginRight: 8, width: '50%' }]}
              placeholder="Seu nome aqui"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, { width: '50%' }]}
              placeholder="Seu sobrenome"
              placeholderTextColor="#888"
              value={sobrenome}
              onChangeText={setSobrenome}
              autoCapitalize="words"
            />
          </View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Escreva seu email aqui"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua senha aqui"
            placeholderTextColor="#888"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => router.push('/LoginUser')} style={styles.loginLinkContainer}>
            <Text style={styles.loginLink}>Já possui cadastro? Fazer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

