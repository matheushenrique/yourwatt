// Service para gerenciar dados de produção de energia solar

import { apiService, createUrl } from './api';
import { API_URLS } from '../utils/constants';
import {
  ProductionData,
  ProductionStats,
  PanelStatus,
  ProductionForecast,
  ProductionByHour,
  ProductionComparison,
  ProductionReport,
  GetProductionQuery,
  ExportProductionOptions,
  SystemPerformance,
  EnvironmentalImpact,
  InverterData,
  PanelAlert,
  MaintenanceRecord,
  ProductionOptimization,
  ProductionPeriod,
} from '../types/production.types';

/**
 * Service de produção de energia solar
 */
export const productionService = {
  /**
   * Busca dados de produção por período
   */
  getProductionData: async (
    period: ProductionPeriod,
    startDate?: string,
    endDate?: string
  ): Promise<ProductionData[]> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/data`, {
      period,
      startDate,
      endDate,
    });

    const response = await apiService.get<ProductionData[]>(url);
    return response.data;
  },

  /**
   * Busca estatísticas gerais de produção
   */
  getProductionStats: async (): Promise<ProductionStats> => {
    const response = await apiService.get<ProductionStats>(
      `${API_URLS.PRODUCTION}/stats`
    );
    return response.data;
  },

  /**
   * Busca status de todos os painéis
   */
  getPanelsStatus: async (): Promise<PanelStatus[]> => {
    const response = await apiService.get<PanelStatus[]>(
      `${API_URLS.PRODUCTION}/panels`
    );
    return response.data;
  },

  /**
   * Busca status de um painel específico
   */
  getPanelById: async (panelId: string): Promise<PanelStatus> => {
    const response = await apiService.get<PanelStatus>(
      `${API_URLS.PRODUCTION}/panels/${panelId}`
    );
    return response.data;
  },

  /**
   * Busca previsão de produção
   */
  getProductionForecast: async (days: number = 7): Promise<ProductionForecast[]> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/forecast`, { days });
    const response = await apiService.get<ProductionForecast[]>(url);
    return response.data;
  },

  /**
   * Busca produção por hora do dia
   */
  getProductionByHour: async (date?: string): Promise<ProductionByHour[]> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/by-hour`, { date });
    const response = await apiService.get<ProductionByHour[]>(url);
    return response.data;
  },

  /**
   * Busca comparação de produção entre períodos
   */
  getProductionComparison: async (
    currentPeriod: string,
    previousPeriod: string
  ): Promise<ProductionComparison> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/comparison`, {
      current: currentPeriod,
      previous: previousPeriod,
    });
    const response = await apiService.get<ProductionComparison>(url);
    return response.data;
  },

  /**
   * Busca performance do sistema
   */
  getSystemPerformance: async (): Promise<SystemPerformance> => {
    const response = await apiService.get<SystemPerformance>(
      `${API_URLS.PRODUCTION}/performance`
    );
    return response.data;
  },

  /**
   * Busca impacto ambiental
   */
  getEnvironmentalImpact: async (): Promise<EnvironmentalImpact> => {
    const response = await apiService.get<EnvironmentalImpact>(
      `${API_URLS.PRODUCTION}/environmental-impact`
    );
    return response.data;
  },

  /**
   * Busca dados dos inversores
   */
  getInvertersData: async (): Promise<InverterData[]> => {
    const response = await apiService.get<InverterData[]>(
      `${API_URLS.PRODUCTION}/inverters`
    );
    return response.data;
  },

  /**
   * Busca inversor específico
   */
  getInverterById: async (inverterId: string): Promise<InverterData> => {
    const response = await apiService.get<InverterData>(
      `${API_URLS.PRODUCTION}/inverters/${inverterId}`
    );
    return response.data;
  },

  /**
   * Busca alertas ativos dos painéis
   */
  getPanelAlerts: async (status?: 'active' | 'resolved'): Promise<PanelAlert[]> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/alerts`, { status });
    const response = await apiService.get<PanelAlert[]>(url);
    return response.data;
  },

  /**
   * Marca alerta como resolvido
   */
  resolveAlert: async (alertId: string): Promise<void> => {
    await apiService.patch(`${API_URLS.PRODUCTION}/alerts/${alertId}/resolve`);
  },

  /**
   * Ignora um alerta
   */
  ignoreAlert: async (alertId: string): Promise<void> => {
    await apiService.patch(`${API_URLS.PRODUCTION}/alerts/${alertId}/ignore`);
  },

  /**
   * Busca histórico de manutenção
   */
  getMaintenanceHistory: async (panelId?: string): Promise<MaintenanceRecord[]> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/maintenance`, { panelId });
    const response = await apiService.get<MaintenanceRecord[]>(url);
    return response.data;
  },

  /**
   * Agenda manutenção
   */
  scheduleMaintenance: async (
    data: Omit<MaintenanceRecord, 'id' | 'status'>
  ): Promise<MaintenanceRecord> => {
    const response = await apiService.post<MaintenanceRecord>(
      `${API_URLS.PRODUCTION}/maintenance`,
      data
    );
    return response.data;
  },

  /**
   * Atualiza status de manutenção
   */
  updateMaintenanceStatus: async (
    maintenanceId: string,
    status: MaintenanceRecord['status']
  ): Promise<void> => {
    await apiService.patch(
      `${API_URLS.PRODUCTION}/maintenance/${maintenanceId}`,
      { status }
    );
  },

  /**
   * Busca análise de otimização
   */
  getOptimizationAnalysis: async (): Promise<ProductionOptimization> => {
    const response = await apiService.get<ProductionOptimization>(
      `${API_URLS.PRODUCTION}/optimization`
    );
    return response.data;
  },

  /**
   * Busca relatório completo de produção
   */
  getProductionReport: async (
    query: GetProductionQuery
  ): Promise<ProductionReport> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/report`, query);
    const response = await apiService.get<ProductionReport>(url);
    return response.data;
  },

  /**
   * Exporta dados de produção
   */
  exportData: async (options: ExportProductionOptions): Promise<void> => {
    const { format, period, startDate, endDate, ...rest } = options;
    
    const url = createUrl(`${API_URLS.PRODUCTION}/export`, {
      format,
      period,
      startDate,
      endDate,
      ...rest,
    });

    const filename = `producao_${period}_${new Date().toISOString().split('T')[0]}.${format}`;
    await apiService.download(url, filename);
  },

  /**
   * Busca produção em tempo real
   */
  getRealTimeProduction: async (): Promise<{
    currentPower: number;
    efficiency: number;
    timestamp: string;
  }> => {
    const response = await apiService.get<{
      currentPower: number;
      efficiency: number;
      timestamp: string;
    }>(`${API_URLS.PRODUCTION}/realtime`);
    return response.data;
  },

  /**
   * Busca melhor dia de produção
   */
  getBestProductionDay: async (
    period: 'month' | 'year' | 'all' = 'month'
  ): Promise<ProductionData> => {
    const url = createUrl(`${API_URLS.PRODUCTION}/best-day`, { period });
    const response = await apiService.get<ProductionData>(url);
    return response.data;
  },

  /**
   * Busca produção média por dia da semana
   */
  getProductionByDayOfWeek: async (): Promise<
    Array<{
      dayOfWeek: number;
      dayName: string;
      averageProduction: number;
      totalProduction: number;
    }>
  > => {
    const response = await apiService.get<
      Array<{
        dayOfWeek: number;
        dayName: string;
        averageProduction: number;
        totalProduction: number;
      }>
    >(`${API_URLS.PRODUCTION}/by-day-of-week`);
    return response.data;
  },

  /**
   * Atualiza configurações de um painel
   */
  updatePanelConfig: async (
    panelId: string,
    config: Partial<PanelStatus>
  ): Promise<PanelStatus> => {
    const response = await apiService.patch<PanelStatus>(
      `${API_URLS.PRODUCTION}/panels/${panelId}`,
      config
    );
    return response.data;
  },

  /**
   * Testa conexão de um painel
   */
  testPanelConnection: async (panelId: string): Promise<{
    success: boolean;
    latency: number;
    message: string;
  }> => {
    const response = await apiService.post<{
      success: boolean;
      latency: number;
      message: string;
    }>(`${API_URLS.PRODUCTION}/panels/${panelId}/test`);
    return response.data;
  },

  /**
   * Reinicia um inversor
   */
  restartInverter: async (inverterId: string): Promise<void> => {
    await apiService.post(`${API_URLS.PRODUCTION}/inverters/${inverterId}/restart`);
  },

  /**
   * Busca logs de um painel
   */
  getPanelLogs: async (
    panelId: string,
    limit: number = 100
  ): Promise<
    Array<{
      timestamp: string;
      event: string;
      severity: string;
      details?: string;
    }>
  > => {
    const url = createUrl(`${API_URLS.PRODUCTION}/panels/${panelId}/logs`, {
      limit,
    });
    const response = await apiService.get<
      Array<{
        timestamp: string;
        event: string;
        severity: string;
        details?: string;
      }>
    >(url);
    return response.data;
  },

  /**
   * Calcula ROI (Retorno sobre Investimento)
   */
  calculateROI: async (installationCost: number): Promise<{
    roi: number;
    paybackPeriod: number; // em meses
    totalSavings: number;
    monthlyAverage: number;
  }> => {
    const response = await apiService.post<{
      roi: number;
      paybackPeriod: number;
      totalSavings: number;
      monthlyAverage: number;
    }>(`${API_URLS.PRODUCTION}/calculate-roi`, { installationCost });
    return response.data;
  },

  /**
   * Busca comparação com outros sistemas similares
   */
  getBenchmark: async (): Promise<{
    yourSystem: number;
    average: number;
    top10Percent: number;
    ranking: number;
    totalSystems: number;
  }> => {
    const response = await apiService.get<{
      yourSystem: number;
      average: number;
      top10Percent: number;
      ranking: number;
      totalSystems: number;
    }>(`${API_URLS.PRODUCTION}/benchmark`);
    return response.data;
  },
};