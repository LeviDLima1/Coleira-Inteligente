import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import api from '@/services/api';
import { styles } from './styles';
import PetSlide from '@/components/Page/HomePage/PetCard/PetSlide';

interface Pet {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  idade: number;
  foto: string | null;
}

interface ApiResponse {
  data: Pet[];
  success: boolean;
}

export default function MeusPetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPets = async () => {
    try {
      setLoading(true);
      const response = await api.get<ApiResponse>('/pets');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setPets(response.data.data);
      } else {
        console.error('Formato de resposta inválido:', response.data);
        setPets([]);
      }
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B3FA0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {!pets || pets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Você ainda não tem pets cadastrados.{'\n'}
              Clique no botão + para adicionar um novo pet.
            </Text>
          </View>
        ) : (
          <PetSlide pets={pets} />
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/PetRegistration')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
} 