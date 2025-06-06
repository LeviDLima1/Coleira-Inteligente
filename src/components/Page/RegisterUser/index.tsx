import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';
import api from '../../../services/api';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';

export const BackButtonLogin = () => {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressed.value ? 0.95 : 1) }],
      opacity: withSpring(pressed.value ? 0.7 : 1),
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={styles.buttonBack}
        onPressIn={() => { pressed.value = 1; }}
        onPressOut={() => { pressed.value = 0; }}
        accessibilityLabel="Voltar para a tela anterior"
        accessibilityRole="button"
      >
        <Text style={styles.buttonBackText}>Voltar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const nameInputFocused = useSharedValue(0);
  const emailInputFocused = useSharedValue(0);
  const passwordInputFocused = useSharedValue(0);

  const handleRegister = async () => {
    try {
        setLoading(true);
        console.log('Enviando dados:', { name, email, password }); // Log para debug
        
        await api.post('/users', {
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

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(loading ? 0.95 : 1) }],
      opacity: withSpring(loading ? 0.7 : 1)
    };
  });

  const nameInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withSpring(nameInputFocused.value ? '#007BFF' : styles.input.borderColor),
    };
  });

  const emailInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withSpring(emailInputFocused.value ? '#007BFF' : styles.input.borderColor),
    };
  });

  const passwordInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withSpring(passwordInputFocused.value ? '#007BFF' : styles.input.borderColor),
    };
  });

  return (
    <ImageBackground source={require('../../../assets/Backgoundlogin.png')} style={styles.bg} resizeMode="cover">
      <BackButtonLogin />
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('../../../assets/Decoration-Paw.png')} resizeMode="contain" />
          <Text style={styles.title}>PetTracker</Text>
          
          <Text style={styles.label}>Nome</Text>
          <Animated.View style={[styles.input, nameInputAnimatedStyle]}>
            <TextInput
              style={{ flex: 1, padding: 0 }}
              placeholder="Seu nome completo"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!loading}
              onFocus={() => { nameInputFocused.value = 1; }}
              onBlur={() => { nameInputFocused.value = 0; }}
              accessibilityLabel="Campo de nome completo para cadastro"
              accessibilityRole="text"
            />
          </Animated.View>

          <Text style={styles.label}>Email</Text>
          <Animated.View style={[styles.input, emailInputAnimatedStyle]}>
            <TextInput
              style={{ flex: 1, padding: 0 }}
              placeholder="Seu email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              onFocus={() => { emailInputFocused.value = 1; }}
              onBlur={() => { emailInputFocused.value = 0; }}
              accessibilityLabel="Campo de email para cadastro"
              accessibilityRole="text"
            />
          </Animated.View>

          <Text style={styles.label}>Senha</Text>
          <Animated.View style={[styles.input, passwordInputAnimatedStyle]}>
            <TextInput
              style={{ flex: 1, padding: 0 }}
              placeholder="Sua senha"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              onFocus={() => { passwordInputFocused.value = 1; }}
              onBlur={() => { passwordInputFocused.value = 0; }}
              accessibilityLabel="Campo de senha para cadastro"
              accessibilityRole="text"
            />
          </Animated.View>

          <TouchableOpacity
            onPress={() => router.push('/LoginUser')}
            style={styles.loginLinkContainer}
            accessibilityLabel="Link para a página de login"
            accessibilityRole="link"
          >
            <Text style={styles.loginLink}>Já possui cadastro? Fazer Login</Text>
          </TouchableOpacity>

          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              disabled={loading}
              onPress={handleRegister}
              accessibilityLabel={loading ? "Cadastrando..." : "Botão cadastrar"}
              accessibilityRole="button"
              accessibilityState={{ busy: loading }}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}

