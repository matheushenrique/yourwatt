import api from './api';
import { LoginCredentials, LoginResponse, User } from '../types/user.types';

export const authService = {
  /**
   * Login com email e senha
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials);
    const { user, tokens } = response.data;
    
    // Salvar no localStorage
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  /**
   * Login com Google OAuth
   */
  async loginWithGoogle(googleToken: string): Promise<LoginResponse> {
    const response = await api.post('/auth/google', { token: googleToken });
    const { user, tokens } = response.data;
    
    // Salvar no localStorage
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  /**
   * Registro de novo usuário
   */
  async register(email: string, password: string, name: string): Promise<LoginResponse> {
    const response = await api.post('/auth/register', { email, password, name });
    const { user, tokens } = response.data;
    
    // Salvar no localStorage
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  /**
   * Renovar access token usando refresh token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    
    return accessToken;
  },

  /**
   * Logout - limpa dados locais
   */
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  /**
   * Obter usuário atual do localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Verificar se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Verificar se usuário é admin
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },

  /**
   * Atualizar dados do usuário no localStorage
   */
  updateUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Recuperar senha
   */
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  /**
   * Resetar senha
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Verificar email
   */
  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token });
  }
};