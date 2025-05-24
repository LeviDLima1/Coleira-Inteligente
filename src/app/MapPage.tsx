import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Rastreamento</Text>
      {/* Aqui você pode adicionar o componente de mapa futuramente */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>[Mapa Aqui]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B3FA0',
    marginBottom: 32,
  },
  mapPlaceholder: {
    width: '90%',
    height: 300,
    backgroundColor: '#EEE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#AAA',
    fontSize: 18,
  },
}); 