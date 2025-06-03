import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';
import api from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';

export const BackButtonLogin = () => {
  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.buttonBack}>
      <Text style={styles.buttonBackText}>Voltar</Text>
    </TouchableOpacity>
  );
};

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/login', {
        email,
        password
      });

      // Salva o token e os dados do usuário
      await AsyncStorage.setItem('token', response.data.token);
      await signIn(response.data.user);

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.push('/Home');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Erro ao fazer login. Tente novamente.'
      );
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

          <TouchableOpacity onPress={() => router.push('/RegisterUser')} style={styles.registerLinkContainer}>
            <Text style={styles.registerLink}>Não possui cadastro? Cadastre-se</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            disabled={loading}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
