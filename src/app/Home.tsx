import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/LoginUser');
    } catch (erro) {
      console.error('Erro ao fazer logout:', erro);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bem-vindo à Home</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
} 