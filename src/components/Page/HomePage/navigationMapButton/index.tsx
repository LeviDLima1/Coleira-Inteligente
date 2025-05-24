import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';



export default function NavigationMapButton() {

  function handlePress() {
    router.navigate('/MapPage');
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>Rastrear Agora</Text>
    </TouchableOpacity>
  );
}
