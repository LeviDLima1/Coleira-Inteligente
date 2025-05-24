import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'; // Exemplo de ícones
import { styles } from "./styles";
import { router } from "expo-router";

export default function PetCard({ pet }: { pet?: any }) {

  function handlePress() {
    router.navigate('/PetRegistration');
  }

  if (!pet) {
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

  return (
    <View style={styles.card}>
      {/* "Ver Mais" no canto superior direito */}
      <Text style={styles.verMais}>Ver Mais</Text>

      {/* Linha principal: Foto + Nome + Status */}
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: pet.avatarUrl || 'URL_DA_IMAGEM_DO_PET' }}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.nome}>{pet.nome || 'Nome do Pet'}</Text>
          <Text style={styles.status}>{pet.status || 'Status do Pet'}</Text>
        </View>
      </View>

      {/* Linha dos ícones */}
      <View style={styles.iconsRow}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="settings" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="center-focus-weak" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
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
