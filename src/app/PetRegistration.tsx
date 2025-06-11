import React from 'react';
import { Stack } from 'expo-router';
import PetRegistrationPage from "../components/Page/PetRegistrationPage";
import { Header } from '../components/header';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function PetRegistration() {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Cadastro do Pet</Text>
            </View>
            <PetRegistrationPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },
    titleContainer: {
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: colors.gray[900],
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.purple[400]
    },
});