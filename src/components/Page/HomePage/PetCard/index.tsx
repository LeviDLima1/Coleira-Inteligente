import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "./styles";
import { router } from "expo-router";
import PetSlide from "./PetSlide";

interface Pet {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  idade: number;
  foto: string | null;
}

interface PetCardProps {
  pets?: Pet[];
}

export default function PetCard({ pets = [] }: PetCardProps) {
  function handlePress() {
    router.navigate('/PetRegistration');
  }

  if (!pets || pets.length === 0) {
    return (
      <View style={[styles.card, emptyStyles.emptyContainer]}>
        <Text style={emptyStyles.emptyText}>Você ainda não possui um pet cadastrado</Text>
        <TouchableOpacity 
          style={emptyStyles.cadastroButton}
          onPress={handlePress}
        >
          <Text style={emptyStyles.cadastroButtonText}>Cadastrar Pet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <PetSlide pets={pets} />;
}

const emptyStyles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    fontFamily: 'Jua_400Regular',
  },
  emptyText: {
    fontSize: 16,
    color: '#7B3FA0',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Jua_400Regular',
  },
  cadastroButton: {
    backgroundColor: '#7B3FA0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    fontFamily: 'Jua_400Regular',
  },
  cadastroButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Jua_400Regular',
  },
});
