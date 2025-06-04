import React, { useState } from 'react';
import { Stack } from 'expo-router';
import PetRegistrationPage from "../components/Page/PetRegistrationPage";
import { Header } from '../components/header';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import SideBar from '../components/Page/HomePage/SideBar';

export default function PetRegistration() {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);

    const handleOpenSideBar = () => {
        setIsSideBarVisible(true);
    };

    const handleCloseSideBar = () => {
        setIsSideBarVisible(false);
    };

    return (
        <View style={styles.container}>
            <Header onMenuPress={handleOpenSideBar} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Cadastro do Pet</Text>
            </View>
            <PetRegistrationPage />
            {isSideBarVisible && <SideBar visible={isSideBarVisible} onClose={handleCloseSideBar} />}
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