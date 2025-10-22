// Configuração central da API usando Axios

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_URLS, STORAGE_KEYS } from '../utils/constants';

/**
 * Instância configurada do Axios
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URLS.BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Interceptor de requisição
 * Adiciona token de autenticação automaticamente
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de resposta
 * Trata erros e refresh de token
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Se o erro for 401 (não autorizado) e não for uma tentativa de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (refreshToken) {
          // Tentar renovar o token
          const response = await axios.post(
            `${API_URLS.BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const { token } = response.data;
          localStorage.setItem(STORAGE_KEYS.TOKEN, token);

          // Retentar a requisição original com o novo token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se falhar ao renovar o token, redirecionar para login
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Tratar outros erros
    return Promise.reject(error);
  }
);

/**
 * Interface para resposta padrão da API
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Interface para erro da API
 */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/**
 * Métodos HTTP da API
 */
export const apiService = {
  /**
   * Requisição GET
   */
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Requisição POST
   */
  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Requisição PUT
   */
  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Requisição PATCH
   */
  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Requisição DELETE
   */
  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Upload de arquivo
   */
  upload: async <T = any>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Download de arquivo
   */
  download: async (
    url: string,
    filename: string,
    config?: AxiosRequestConfig
  ): Promise<void> => {
    try {
      const response = await api.get(url, {
        ...config,
        responseType: 'blob',
      });

      // Criar link temporário para download
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

/**
 * Trata erros da API e retorna mensagem apropriada
 */
const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response) {
      // Erro com resposta do servidor
      return {
        message: axiosError.response.data?.message || 'Erro no servidor',
        statusCode: axiosError.response.status,
        errors: axiosError.response.data?.errors,
      };
    } else if (axiosError.request) {
      // Erro de rede (sem resposta)
      return {
        message: 'Erro de conexão. Verifique sua internet.',
        statusCode: 0,
      };
    }
  }

  // Erro genérico
  return {
    message: error.message || 'Erro desconhecido',
    statusCode: 500,
  };
};

/**
 * Configura o token de autenticação
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
};

/**
 * Remove o token de autenticação
 */
export const clearAuthToken = (): void => {
  delete api.defaults.headers.common['Authorization'];
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Verifica se há token de autenticação
 */
export const hasAuthToken = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Construtor de query string
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, item.toString()));
      } else {
        query.append(key, value.toString());
      }
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Função auxiliar para criar URL com query params
 */
export const createUrl = (
  endpoint: string,
  params?: Record<string, any>
): string => {
  if (!params) return endpoint;
  return `${endpoint}${buildQueryString(params)}`;
};

export default api;