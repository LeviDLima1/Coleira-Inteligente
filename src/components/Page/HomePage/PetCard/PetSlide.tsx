import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import { router } from "expo-router";
import { colors } from "@/styles/colors";
import { AntDesign } from '@expo/vector-icons';

interface Pet {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  idade: number;
  foto: string | null;
  status?: string;
}

interface PetSlideProps {
  pets: Pet[];
}

export default function PetSlide({ pets }: PetSlideProps) {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.85;

  const handleUpdatePet = (petId: number) => {
    router.push({
      pathname: '/PetRegistration',
      params: { petId }
    });
  };

  const handleTrackPet = (petId: number) => {
    router.push({
      pathname: '/map',
      params: { petId }
    });
  };

  const handleNotifications = (petId: number) => {
    console.log(`Navegando para notificações do pet ID: ${petId}`);
  };

  const handleSettings = (petId: number) => {
    console.log(`Navegando para configurações do pet ID: ${petId}`);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.slideContainer}
      contentContainerStyle={{ 
        paddingHorizontal: 20,
        gap: 24,
      }}
    >
      {pets.map((pet) => (
        <View key={pet.id} style={[styles.card, { width: cardWidth }]}>
          <View style={styles.petInfoRow}>
            <View style={styles.avatarContainer}>
              <Image
                source={pet.foto ? { uri: pet.foto } : require('../../../../assets/Decoration-Paw.png')}
                style={styles.avatar}
              />
            </View>
            <View style={styles.petTextContainer}>
              <Text style={styles.nome}>{pet.nome}</Text>
              <Text style={styles.status}>{pet.status || 'Status desconhecido'}</Text>
              <Text style={styles.id}>ID: {pet.id}</Text>
            </View>
          </View>

          <View style={styles.iconsRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleNotifications(pet.id)}
            >
              <Feather name="bell" size={24} color={colors.gray[700]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleSettings(pet.id)}
            >
              <Feather name="settings" size={24} color={colors.gray[700]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleTrackPet(pet.id)}
            >
              <MaterialIcons name="my-location" size={24} color={colors.gray[700]} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
} 