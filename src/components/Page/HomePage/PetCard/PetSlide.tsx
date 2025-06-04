import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import { router } from "expo-router";
import { colors } from "@/styles/colors";

interface Pet {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  idade: number;
  foto: string | null;
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
      pathname: '/MapPage',
      params: { petId }
    });
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
          <View style={styles.row}>
            <View style={styles.avatarContainer}>
              <Image
                source={pet.foto ? { uri: pet.foto } : require('../../../../assets/Decoration-Paw.png')}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.nome}>{pet.nome}</Text>
              <Text style={styles.status}>{pet.tipo === 'dog' ? 'Cachorro' : 'Gato'} - {pet.raca}</Text>
            </View>
          </View>

          <View style={styles.iconsRow}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleUpdatePet(pet.id)}
            >
              <Feather name="edit" size={24} color={colors.purple[600]} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => handleTrackPet(pet.id)}
            >
              <MaterialIcons name="location-on" size={24} color={colors.purple[600]} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
} 