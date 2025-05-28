import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';
import { BackButtonLogin } from '../LoginUser'
import api from '../../../services/api';

export default function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
        setLoading(true);
        console.log('Enviando dados:', { name, email, password }); // Log para debug
        
        await api.post('/users/register', {
            name,
            email,
            password
        });

        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        router.push('/LoginUser');
    } catch (error: any) {
        console.error('Erro completo:', error); // Log detalhado do erro
        Alert.alert('Erro', error.response?.data?.error || 'Erro ao cadastrar usuário');
    } finally {
        setLoading(false);
    }
};

  return (
    <ImageBackground source={require('../../../assets/Backgoundlogin.png')} style={styles.bg} resizeMode="cover">
      <BackButtonLogin />
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('../../../assets/Decoration-Paw.png')} resizeMode="contain" />
          <Text style={styles.title}>PetTracker</Text>
          
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!loading}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity onPress={() => router.push('/LoginUser')} style={styles.loginLinkContainer}>
            <Text style={styles.loginLink}>Já possui cadastro? Fazer Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            disabled={loading}
            onPress={handleRegister}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

