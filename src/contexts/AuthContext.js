import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioService } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarStorage() {
            const storageUsuario = await AsyncStorage.getItem('@ColeiraApp:usuario');
            const storageToken = await AsyncStorage.getItem('@ColeiraApp:token');

            if (storageUsuario && storageToken) {
                setUsuario(JSON.parse(storageUsuario));
            }
            setLoading(false);
        }

        carregarStorage();
    }, []);

    async function login(email, password) {
        try {
            const response = await usuarioService.login(email, password);
            const { usuario, token } = response;

            await AsyncStorage.setItem('@ColeiraApp:usuario', JSON.stringify(usuario));
            await AsyncStorage.setItem('@ColeiraApp:token', token);

            setUsuario(usuario);
        } catch (erro) {
            throw erro;
        }
    }

    async function registrar(dados) {
        try {
            const response = await usuarioService.registrar(dados);
            const { usuario, token } = response;

            await AsyncStorage.setItem('@ColeiraApp:usuario', JSON.stringify(usuario));
            await AsyncStorage.setItem('@ColeiraApp:token', token);

            setUsuario(usuario);
        } catch (erro) {
            throw erro;
        }
    }

    async function logout() {
        await AsyncStorage.removeItem('@ColeiraApp:usuario');
        await AsyncStorage.removeItem('@ColeiraApp:token');
        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!usuario,
                usuario,
                loading,
                login,
                registrar,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
} 