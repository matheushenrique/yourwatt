import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar se há usuário salvo no localStorage ao carregar
  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Validar token e buscar dados do usuário
          const userData = await authService.validateToken(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  // Login com email e senha
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const { user: userData, token } = await authService.login({ email, password });

      // Salvar token e dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      throw new Error(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  // Login com Google
  const loginWithGoogle = async (credential: string): Promise<void> => {
    try {
      setLoading(true);
      const { user: userData, token } = await authService.loginWithGoogle(credential);
      
      // Salvar token e dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error: any) {
      console.error('Erro ao fazer login com Google:', error);
      throw new Error(error.message || 'Erro ao fazer login com Google.');
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authService.logout();
      
      // Remover dados do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, remove os dados locais
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar dados do usuário
  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        loginWithGoogle,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};