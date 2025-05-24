import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <ImageBackground source={require('../../../assets/Backgoundlogin.png')} style={styles.bg} resizeMode="cover">
      <View style={styles.container}>
        
        <View style={styles.form}>
          <Image source={require('../../../assets/Decoration-Paw.png')} style={styles.paws} resizeMode="contain" />
          <Text style={styles.title}>PetTracker</Text>
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
          <View style={styles.linksRow}>
            <TouchableOpacity onPress={() => router.push('/RegisterUser')}>
              <Text style={styles.link}>Cadastre-se aqui</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
