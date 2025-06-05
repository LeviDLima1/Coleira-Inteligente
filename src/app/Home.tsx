import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sliders } from '@/components/Page/HomePage/sliders';
import NavigationMapButton from '@/components/Page/HomePage/navigationMapButton';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import PetCard from '@/components/Page/HomePage/PetCard';
import SideBar from '@/components/Page/HomePage/SideBar';
import api from '@/services/api';
import { colors } from '@/styles/colors';
import { useFocusEffect } from 'expo-router';
import React from 'react';

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

export default function HomeScreen() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenSideBar = () => {
    setIsSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setIsSideBarVisible(false);
  };

  const loadPets = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<ApiResponse>('/pets');
      console.log('Resposta da API:', response.data);
      
      if (response.data.success && Array.isArray(response.data.data)) {
        setPets(response.data.data);
      } else {
        console.error('Formato de resposta inválido:', response.data);
        setPets([]);
      }
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
      setPets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPets();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header onMenuPress={handleOpenSideBar} />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Sliders />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.purple[600]} />
          </View>
        ) : (
          <PetCard pets={pets} />
        )}
      </ScrollView>
      <NavigationMapButton />
      <SideBar visible={isSideBarVisible} onClose={handleCloseSideBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
}); 