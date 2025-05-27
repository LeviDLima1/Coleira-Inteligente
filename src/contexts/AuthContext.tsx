import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usuarioService } from '../services/api';

interface AuthContextData {
  signed: boolean;
  usuario: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registrar: (dados: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({
  signed: false,
  usuario: null,
  loading: false,
  login: async () => {},
  registrar: async () => {},
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<any>(null);
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

  async function login(email: string, password: string) {
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

  async function registrar(dados: { name: string; email: string; password: string }) {
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

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 