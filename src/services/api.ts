import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Usuario {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  usuario: Usuario;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

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
  async registrar(dados: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/usuarios/registrar', dados);
      return response.data;
    } catch (erro) {
      throw erro.response?.data || { erro: 'Erro ao registrar usuário' };
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/usuarios/login', {
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