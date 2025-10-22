import api from './api';
import { ConsumptionData, BillingInfo } from '../types/user.types';

export const consumptionService = {
  /**
   * Obter histórico de consumo do usuário
   * @param startDate - Data inicial (formato: YYYY-MM-DD)
   * @param endDate - Data final (formato: YYYY-MM-DD)
   */
  async getHistory(startDate?: string, endDate?: string): Promise<ConsumptionData[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/consumption/history?${params.toString()}`);
    return response.data;
  },

  /**
   * Obter consumo de um mês específico
   */
  async getMonthly(year: number, month: number): Promise<ConsumptionData> {
    const response = await api.get(`/consumption/monthly/${year}/${month}`);
    return response.data;
  },

  /**
   * Obter informações da conta atual
   */
  async getCurrentBilling(): Promise<BillingInfo> {
    const response = await api.get('/billing/current');
    return response.data;
  },

  /**
   * Obter comparativo com/sem energia solar
   */
  async getComparative(year: number, month: number): Promise<{
    withSolar: number;
    withoutSolar: number;
    savings: number;
    savingsPercentage: number;
  }> {
    const response = await api.get(`/consumption/comparative/${year}/${month}`);
    return response.data;
  },

  /**
   * Obter estatísticas de consumo do usuário
   */
  async getStats(): Promise<{
    totalConsumption: number;
    averageConsumption: number;
    totalSavings: number;
    peakConsumption: number;
    lowestConsumption: number;
  }> {
    const response = await api.get('/consumption/stats');
    return response.data;
  },

  /**
   * Obter consumo por hora (dia específico)
   */
  async getHourly(date: string): Promise<Array<{
    hour: number;
    consumption: number;
  }>> {
    const response = await api.get(`/consumption/hourly/${date}`);
    return response.data;
  },

  /**
   * Obter previsão de consumo
   */
  async getForecast(months: number = 3): Promise<Array<{
    month: string;
    year: number;
    estimatedConsumption: number;
    estimatedCost: number;
  }>> {
    const response = await api.get(`/consumption/forecast?months=${months}`);
    return response.data;
  },

  /**
   * Exportar relatório em PDF
   */
  async exportPDF(startDate?: string, endDate?: string): Promise<Blob> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/reports/consumption/pdf?${params.toString()}`, {
      responseType: 'blob',
    });
    
    return response.data;
  },

  /**
   * Exportar relatório em Excel
   */
  async exportExcel(startDate?: string, endDate?: string): Promise<Blob> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/reports/consumption/excel?${params.toString()}`, {
      responseType: 'blob',
    });
    
    return response.data;
  },

  /**
   * Download de arquivo (helper)
   */
  downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  /**
   * Obter alertas de consumo
   */
  async getAlerts(): Promise<Array<{
    id: string;
    type: 'high_consumption' | 'unusual_pattern' | 'peak_hour';
    message: string;
    date: string;
    severity: 'low' | 'medium' | 'high';
  }>> {
    const response = await api.get('/consumption/alerts');
    return response.data;
  },

  /**
   * Marcar alerta como lido
   */
  async markAlertAsRead(alertId: string): Promise<void> {
    await api.patch(`/consumption/alerts/${alertId}/read`);
  }
};