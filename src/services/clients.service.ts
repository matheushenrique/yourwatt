import api from './api';
import { ClientConsumption } from '../types/user.types';

export const clientsService = {
  /**
   * Obter lista de todos os clientes (Admin only)
   */
  async getAll(filters?: {
    status?: 'active' | 'inactive';
    plan?: string;
    sortBy?: 'name' | 'consumption' | 'savings' | 'joinDate';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{
    clients: ClientConsumption[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.plan) params.append('plan', filters.plan);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.order) params.append('order', filters.order);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/admin/clients?${params.toString()}`);
    return response.data;
  },

  /**
   * Obter detalhes completos de um cliente específico
   */
  async getById(clientId: string): Promise<{
    userId: string;
    userName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    plan: string;
    status: 'active' | 'inactive';
    joinDate: string;
    totalConsumption: number;
    totalSavings: number;
    averageMonthlyConsumption: number;
    monthlyConsumption: Array<{
      month: string;
      year: number;
      consumption: number;
      cost: number;
      savings: number;
    }>;
    lastUpdate: string;
    notes?: string;
  }> {
    const response = await api.get(`/admin/clients/${clientId}`);
    return response.data;
  },

  /**
   * Obter consumo de um cliente por período
   */
  async getConsumption(
    clientId: string,
    startDate?: string,
    endDate?: string
  ): Promise<Array<{
    date: string;
    consumption: number;
    cost: number;
    savings: number;
  }>> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(
      `/admin/clients/${clientId}/consumption?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Obter estatísticas gerais de clientes
   */
  async getStats(): Promise<{
    totalClients: number;
    activeClients: number;
    inactiveClients: number;
    totalConsumption: number;
    totalSavings: number;
    averageConsumption: number;
    averageSavings: number;
    topConsumers: Array<{
      userId: string;
      userName: string;
      consumption: number;
    }>;
    newClientsThisMonth: number;
    churnRate: number;
  }> {
    const response = await api.get('/admin/clients/stats');
    return response.data;
  },

  /**
   * Buscar clientes por nome ou email
   */
  async search(query: string, filters?: {
    status?: 'active' | 'inactive';
    plan?: string;
  }): Promise<ClientConsumption[]> {
    const params = new URLSearchParams();
    params.append('q', query);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.plan) params.append('plan', filters.plan);
    
    const response = await api.get(`/admin/clients/search?${params.toString()}`);
    return response.data;
  },

  /**
   * Exportar lista de clientes em CSV
   */
  async exportCSV(filters?: {
    status?: string;
    plan?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.plan) params.append('plan', filters.plan);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/admin/clients/export/csv?${params.toString()}`, {
      responseType: 'blob',
    });
    
    return response.data;
  },

  /**
   * Exportar lista de clientes em Excel
   */
  async exportExcel(filters?: {
    status?: string;
    plan?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.plan) params.append('plan', filters.plan);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/admin/clients/export/excel?${params.toString()}`, {
      responseType: 'blob',
    });
    
    return response.data;
  },

  /**
   * Obter ranking de clientes por consumo
   */
  async getRanking(metric: 'consumption' | 'savings' = 'consumption', limit: number = 10): Promise<Array<{
    rank: number;
    userId: string;
    userName: string;
    email: string;
    value: number;
    percentage: number;
  }>> {
    const response = await api.get(`/admin/clients/ranking?metric=${metric}&limit=${limit}`);
    return response.data;
  },

  /**
   * Obter histórico de faturas de um cliente
   */
  async getBillingHistory(clientId: string, limit?: number): Promise<Array<{
    id: string;
    month: string;
    year: number;
    consumption: number;
    cost: number;
    savings: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
    paidDate?: string;
  }>> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    
    const response = await api.get(`/admin/clients/${clientId}/billing?${params.toString()}`);
    return response.data;
  },

  /**
   * Atualizar informações de um cliente
   */
  async update(clientId: string, data: {
    plan?: string;
    status?: 'active' | 'inactive';
    notes?: string;
    phone?: string;
    address?: string;
  }): Promise<void> {
    await api.patch(`/admin/clients/${clientId}`, data);
  },

  /**
   * Obter planos disponíveis
   */
  async getPlans(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    features: string[];
    price: number;
    isActive: boolean;
  }>> {
    const response = await api.get('/admin/clients/plans');
    return response.data;
  },

  /**
   * Alterar plano de um cliente
   */
  async changePlan(clientId: string, planId: string): Promise<void> {
    await api.patch(`/admin/clients/${clientId}/change-plan`, { planId });
  },

  /**
   * Obter análise de churn (clientes que cancelaram)
   */
  async getChurnAnalysis(months: number = 6): Promise<{
    churnRate: number;
    churned: number;
    retained: number;
    reasons: Array<{
      reason: string;
      count: number;
      percentage: number;
    }>;
    trend: Array<{
      month: string;
      churnRate: number;
    }>;
  }> {
    const response = await api.get(`/admin/clients/churn-analysis?months=${months}`);
    return response.data;
  },

  /**
   * Obter segmentação de clientes
   */
  async getSegmentation(): Promise<{
    byPlan: Array<{ plan: string; count: number; percentage: number }>;
    byConsumption: Array<{ range: string; count: number; percentage: number }>;
    byLocation: Array<{ city: string; count: number }>;
  }> {
    const response = await api.get('/admin/clients/segmentation');
    return response.data;
  },

  /**
   * Enviar notificação para um cliente específico
   */
  async sendNotification(clientId: string, notification: {
    type: 'email' | 'sms' | 'push';
    subject?: string;
    message: string;
  }): Promise<void> {
    await api.post(`/admin/clients/${clientId}/notify`, notification);
  },

  /**
   * Enviar notificação em massa
   */
  async sendBulkNotification(filters: {
    status?: 'active' | 'inactive';
    plan?: string;
  }, notification: {
    type: 'email' | 'sms' | 'push';
    subject?: string;
    message: string;
  }): Promise<{ sent: number; failed: number }> {
    const response = await api.post('/admin/clients/bulk-notify', { filters, notification });
    return response.data;
  }
};