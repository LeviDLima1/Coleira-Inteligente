import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://192.168.18.31:3000/api'
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('@ColeiraApp:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const usuarioService = {
    async registrar(dados) {
        try {
            const response = await api.post('/usuarios/registrar', dados);
            return response.data;
        } catch (erro) {
            throw erro.response?.data || { erro: 'Erro ao registrar usuário' };
        }
    },

    async login(email, password) {
        try {
            const response = await api.post('/usuarios/login', {
                email,
                password
            });
            return response.data;
        } catch (erro) {
            throw erro.response?.data || { erro: 'Erro ao fazer login' };
        }
    }
};

export default api; 