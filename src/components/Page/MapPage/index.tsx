import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { Header } from '../../header';
import { colors } from '@/styles/colors';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface PetLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  batteryLevel?: number;
  status?: string;
}

// Interface para os detalhes completos do pet (baseado no log anterior)
interface PetDetails {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  idade: number;
  foto: string | null;
}

interface SafeZone {
  id: number;
  name: string;
  center_latitude: number;
  center_longitude: number;
  radius: number;
}

const MapPage: React.FC = () => {
  const [petLocation, setPetLocation] = useState<PetLocation | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [petDetails, setPetDetails] = useState<PetDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [isCreatingZone, setIsCreatingZone] = useState(false);
  const [newZoneCenter, setNewZoneCenter] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showSafeZonesList, setShowSafeZonesList] = useState(false); // Estado para controlar a visibilidade da lista
  const { user } = useAuth();
  const { petId: routePetId } = useLocalSearchParams();

  // Converter petId para número e garantir que seja válido
  const petId = typeof routePetId === 'string' ? parseInt(routePetId, 10) : undefined;

  // Função para obter a localização do usuário
  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (error) {
      setErrorMsg('Erro ao obter localização');
      console.error('Erro ao obter localização:', error);
    }
  };

  // Função para obter a localização do pet
  const getPetLocation = async () => {
    try {
      const response = await api.get(`/pets/location/${petId}`);
      setPetLocation(response.data.data);
    } catch (error) {
      console.error('Erro ao obter localização do pet:', error);
    }
  };

  // Função para obter os detalhes do pet
  const getPetDetails = async () => {
    try {
      const response = await api.get(`/pets/${petId}`);
      setPetDetails(response.data.data);
    } catch (error) {
      setErrorMsg('Erro ao obter detalhes do pet');
      console.error('Erro ao obter detalhes do pet:', error);
    }
  };

  // Função para obter as zonas seguras
  const getSafeZones = async () => {
    try {
      const response = await api.get('/safe-zones');
      setSafeZones(response.data.data);
    } catch (error) {
      console.error('Erro ao obter zonas seguras:', error);
    }
  };

  // Função para criar uma nova zona segura
  const createSafeZone = async () => {
    if (!newZoneCenter) return;

    try {
      const response = await api.post('/safe-zones', {
        name: `Zona Segura ${safeZones.length + 1}`,
        center_latitude: newZoneCenter.latitude,
        center_longitude: newZoneCenter.longitude,
        radius: 100 // Raio padrão de 100 metros
      });

      setSafeZones([...safeZones, response.data.data]);
      setIsCreatingZone(false);
      setNewZoneCenter(null);
      Alert.alert('Sucesso', 'Zona segura criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar zona segura:', error);
      Alert.alert('Erro', 'Não foi possível criar a zona segura.');
    }
  };

  // Função para excluir uma zona segura
  const deleteSafeZone = async (zoneId: number) => {
    try {
      await api.delete(`/safe-zones/${zoneId}`);
      setSafeZones(safeZones.filter(zone => zone.id !== zoneId));
      Alert.alert('Sucesso', 'Zona segura excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir zona segura:', error);
      Alert.alert('Erro', 'Não foi possível excluir a zona segura.');
    }
  };

  // Atualiza a localização a cada 5 segundos e busca detalhes do pet ao carregar
  useEffect(() => {
    getUserLocation();
    getSafeZones();
    // Só busca a localização e detalhes se tiver um petId válido
    if (petId) {
      getPetLocation();
      getPetDetails();

      const interval = setInterval(() => {
        getPetLocation();
      }, 5000);

      return () => clearInterval(interval);
    } else {
      setErrorMsg('ID do pet não disponível para rastreamento.');
    }
  }, [petId]);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={(e) => {
            if (isCreatingZone) {
              setNewZoneCenter(e.nativeEvent.coordinate);
            }
          }}
        >
          {/* Marcador do usuário */}
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Sua localização"
            pinColor="blue"
          />

          {/* Marcador do pet */}
          {petLocation && typeof petLocation.latitude === 'number' && typeof petLocation.longitude === 'number' && (
            <Marker
              coordinate={{
                latitude: petLocation.latitude,
                longitude: petLocation.longitude,
              }}
              title={`Localização: ${petDetails?.nome || 'Pet'}`}
              pinColor="red"
            />
          )}

          {/* Zonas seguras */}
          {safeZones.map((zone) => (
            <Circle
              key={zone.id}
              center={{
                latitude: zone.center_latitude,
                longitude: zone.center_longitude,
              }}
              radius={zone.radius}
              strokeColor="rgba(0, 150, 0, 0.5)"
              fillColor="rgba(0, 150, 0, 0.2)"
            />
          ))}

          {/* Nova zona segura sendo criada (prévia) */}
          {isCreatingZone && newZoneCenter && (
            <Circle
              center={newZoneCenter}
              radius={100} // Raio padrão para prévia
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.2)"
            />
          )}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Carregando mapa...</Text>
        </View>
      )}

      {/* Botão para alternar visibilidade da lista de zonas seguras */}
      <TouchableOpacity
        style={styles.toggleListButton}
        onPress={() => setShowSafeZonesList(!showSafeZonesList)}
      >
        <Text style={styles.toggleListButtonText}>Zonas Seguras</Text>
      </TouchableOpacity>

      {/* Lista de zonas seguras */}
      {showSafeZonesList && (
        <View style={styles.safeZonesList}>
          <Text style={styles.safeZonesTitle}>Zonas Seguras</Text>
          {safeZones.map((zone) => (
            <View key={zone.id} style={styles.safeZoneItem}>
              <Text style={styles.safeZoneName}>{zone.name || `Zona ${zone.id}`}</Text>
              <TouchableOpacity
                onPress={() => deleteSafeZone(zone.id)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={24} color={colors.red[500]} />
              </TouchableOpacity>
            </View>
          ))}
          {safeZones.length === 0 && (
            <Text style={styles.noZonesText}>Nenhuma zona segura cadastrada.</Text>
          )}
        </View>
      )}

      {/* Seção de Informações do Pet */}
      <View style={styles.petInfoContainer}>
        {petDetails ? (
          <View style={styles.petDetailsContent}>
            {petDetails.foto && (
              <Image
                source={{ uri: petDetails.foto }}
                style={styles.petImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.petTextDetails}>
              <Text style={styles.petName}>{petDetails.nome}</Text>
              <Text style={styles.petDetail}>Tipo: {petDetails.tipo}</Text>
              <Text style={styles.petDetail}>Raça: {petDetails.raca}</Text>
              <Text style={styles.petDetail}>Idade: {petDetails.idade} meses</Text>
              {petLocation?.timestamp && (
                <Text style={styles.petDetail}>Última atualização: {new Date(petLocation.timestamp).toLocaleString()}</Text>
              )}
              {petLocation?.batteryLevel !== undefined && (
                <Text style={styles.petDetail}>Bateria: {petLocation.batteryLevel}%</Text>
              )}
              {petLocation?.status && (
                <Text style={styles.petDetail}>Status: {petLocation.status}</Text>
              )}
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Carregando informações do pet...</Text>
        )}
      </View>

      {/* Botão para iniciar/finalizar a criação de zona segura */}
      {/* Renderizar APENAS se a lista de zonas seguras NÃO estiver visível */}
      {!showSafeZonesList && (
        <TouchableOpacity
          style={styles.createZoneButton}
          onPress={() => {
            if (isCreatingZone && newZoneCenter) {
              createSafeZone();
            } else if (isCreatingZone && !newZoneCenter) {
              // Cancel creation if already in creation mode but no center selected
               setIsCreatingZone(false);
               Alert.alert('Criação Cancelada', 'Definição da zona segura cancelada.');
            } else {
              setIsCreatingZone(true);
              setNewZoneCenter(null); // Reset center when starting creation
              Alert.alert(
                'Criar Zona Segura',
                'Toque e segure no mapa para definir o centro da zona segura.',
                [{ text: 'Cancelar', onPress: () => setIsCreatingZone(false) }, { text: 'OK' }]
              );
            }
          }}
        >
          <MaterialIcons
            name={isCreatingZone ? "check" : "add-location"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
  petInfoContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 5,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  petDetailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  petTextDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.purple[800],
    marginBottom: 4,
  },
  petDetail: {
    fontSize: 15,
    color: colors.gray[700],
    marginBottom: 4,
  },
  petStatus: {
    fontSize: 15,
    color: colors.gray[700],
    marginBottom: 3,
    marginTop: 5,
  },
  loadingText: {
    textAlign: 'center',
    color: colors.gray[600],
    fontSize: 16,
  },
  createZoneButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.purple[600],
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1, // Ensure it's above the map
  },
  safeZonesList: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    maxHeight: 200,
    zIndex: 1, // Ensure it's above the map
  },
  safeZonesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 10,
  },
  safeZoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  safeZoneName: {
    fontSize: 14,
    color: colors.gray[700],
  },
  deleteButton: {
    padding: 5,
  },
  toggleListButton: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: colors.purple[600],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1,
  },
  toggleListButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noZonesText: {
    fontSize: 14,
    color: colors.gray[600],
    fontStyle: 'italic',
  },
});

export default MapPage;
