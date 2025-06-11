import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Função para determinar a URL base
const getBaseUrl = () => {
  // Em desenvolvimento, use o IP local
  if (__DEV__) {
    // Use o mesmo IP para todas as plataformas
    return 'http://192.168.1.2:3000/api';
  }
  // Em produção, use a URL do servidor
  return 'https://seu-servidor.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000, // Aumentando o timeout para 15 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      console.log('🚀 Requisição sendo enviada:', {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers
      });

      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Token adicionado à requisição');
      } else {
        console.log('⚠️ Nenhum token encontrado');
      }
      return config;
    } catch (error) {
      console.error('❌ Erro ao preparar requisição:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('❌ Timeout na requisição');
      return Promise.reject(new Error('O servidor demorou muito para responder. Verifique sua conexão.'));
    }

    if (!error.response) {
      console.error('❌ Erro de rede:', error.message);
      return Promise.reject(new Error('Não foi possível conectar ao servidor. Verifique sua conexão.'));
    }

    console.error('❌ Erro na resposta:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });

    if (error.response?.status === 401) {
      console.log('🔒 Token inválido ou expirado, removendo dados de autenticação');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;