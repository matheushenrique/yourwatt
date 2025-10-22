// Service para exportação de dados em diversos formatos

import { apiService, createUrl } from './api';
import { API_URLS } from '../utils/constants';
import {
  ExportProductionOptions,
  ProductionData,
  ProductionStats,
} from '../types/production.types';
import {
  ExportConsumptionOptions,
  ConsumptionData,
  ConsumptionStats,
} from '../types/consumption.types';

/**
 * Opções gerais de exportação
 */
export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  filename?: string;
  includeCharts?: boolean;
  includeHeaders?: boolean;
  dateFormat?: 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MM/DD/YYYY';
}

/**
 * Service de exportação de dados
 */
export const exportService = {
  /**
   * Exporta dados de produção
   */
  exportProduction: async (options: ExportProductionOptions): Promise<void> => {
    const { format, period, startDate, endDate, ...rest } = options;

    const url = createUrl(`${API_URLS.PRODUCTION}/export`, {
      format,
      period,
      startDate,
      endDate,
      ...rest,
    });

    const filename =
      options.filename ||
      `producao_solar_${period}_${new Date().toISOString().split('T')[0]}.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta dados de consumo
   */
  exportConsumption: async (options: ExportConsumptionOptions): Promise<void> => {
    const { format, period, startDate, endDate, ...rest } = options;

    const url = createUrl(`${API_URLS.CONSUMPTION}/export`, {
      format,
      period,
      startDate,
      endDate,
      ...rest,
    });

    const filename =
      options.filename ||
      `consumo_energia_${period}_${new Date().toISOString().split('T')[0]}.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta relatório completo (produção + consumo)
   */
  exportCompleteReport: async (options: {
    format: 'pdf' | 'xlsx';
    period: 'monthly' | 'yearly';
    startDate?: string;
    endDate?: string;
    includeCharts?: boolean;
    includeInsights?: boolean;
  }): Promise<void> => {
    const { format, period, ...rest } = options;

    const url = createUrl(`${API_URLS.REPORTS}/complete`, {
      format,
      period,
      ...rest,
    });

    const filename = `relatorio_completo_${period}_${
      new Date().toISOString().split('T')[0]
    }.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta dados de faturas
   */
  exportBilling: async (options: {
    format: 'csv' | 'xlsx' | 'pdf';
    startDate?: string;
    endDate?: string;
    status?: 'pending' | 'paid' | 'overdue' | 'canceled';
  }): Promise<void> => {
    const { format, ...rest } = options;

    const url = createUrl(`${API_URLS.BILLING}/export`, {
      format,
      ...rest,
    });

    const filename = `faturas_${new Date().toISOString().split('T')[0]}.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta dados dos painéis
   */
  exportPanelsStatus: async (options: {
    format: 'csv' | 'xlsx' | 'pdf';
    includeAlerts?: boolean;
    includeMaintenanceHistory?: boolean;
  }): Promise<void> => {
    const { format, ...rest } = options;

    const url = createUrl(`${API_URLS.PRODUCTION}/panels/export`, {
      format,
      ...rest,
    });

    const filename = `paineis_status_${new Date().toISOString().split('T')[0]}.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta histórico de manutenção
   */
  exportMaintenanceHistory: async (options: {
    format: 'csv' | 'xlsx' | 'pdf';
    startDate?: string;
    endDate?: string;
    panelId?: string;
  }): Promise<void> => {
    const { format, ...rest } = options;

    const url = createUrl(`${API_URLS.PRODUCTION}/maintenance/export`, {
      format,
      ...rest,
    });

    const filename = `manutencao_${new Date().toISOString().split('T')[0]}.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta impacto ambiental
   */
  exportEnvironmentalImpact: async (options: {
    format: 'pdf';
    period: 'monthly' | 'yearly' | 'all';
    includeComparisons?: boolean;
  }): Promise<void> => {
    const { format, period, ...rest } = options;

    const url = createUrl(`${API_URLS.PRODUCTION}/environmental-impact/export`, {
      format,
      period,
      ...rest,
    });

    const filename = `impacto_ambiental_${period}_${
      new Date().toISOString().split('T')[0]
    }.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta análise de otimização
   */
  exportOptimizationAnalysis: async (options: {
    format: 'pdf';
    includeRecommendations?: boolean;
  }): Promise<void> => {
    const { format, ...rest } = options;

    const url = createUrl(`${API_URLS.PRODUCTION}/optimization/export`, {
      format,
      ...rest,
    });

    const filename = `analise_otimizacao_${
      new Date().toISOString().split('T')[0]
    }.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Exporta comparativo de períodos
   */
  exportComparison: async (options: {
    format: 'csv' | 'xlsx' | 'pdf';
    currentPeriod: string;
    previousPeriod: string;
    includeCharts?: boolean;
  }): Promise<void> => {
    const { format, ...rest } = options;

    const url = createUrl(`${API_URLS.ANALYTICS}/comparison/export`, {
      format,
      ...rest,
    });

    const filename = `comparativo_${new Date().toISOString().split('T')[0]}.${format}`;

    await apiService.download(url, filename);
  },

  /**
   * Gera CSV a partir de dados (client-side)
   */
  generateCSV: (
    data: Array<Record<string, any>>,
    filename: string,
    options?: {
      headers?: string[];
      delimiter?: string;
    }
  ): void => {
    if (data.length === 0) {
      console.warn('Nenhum dado para exportar');
      return;
    }

    const delimiter = options?.delimiter || ',';
    const headers = options?.headers || Object.keys(data[0]);

    // Criar CSV
    let csv = headers.join(delimiter) + '\n';

    data.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header];
        // Tratar valores com vírgula ou aspas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      });
      csv += values.join(delimiter) + '\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Gera JSON a partir de dados (client-side)
   */
  generateJSON: (data: any, filename: string): void => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      filename.endsWith('.json') ? filename : `${filename}.json`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Formata dados de produção para CSV
   */
  formatProductionToCSV: (data: ProductionData[]): Array<Record<string, any>> => {
    return data.map((item) => ({
      Data: new Date(item.date).toLocaleDateString('pt-BR'),
      'Produção (kWh)': item.production.toFixed(2),
      'Capacidade (kWh)': item.capacity.toFixed(2),
      'Eficiência (%)': item.efficiency.toFixed(2),
      'Pico de Potência (W)': item.peakPower,
      'Potência Média (W)': item.averagePower,
      'Horas de Sol': item.sunHours.toFixed(2),
      'Clima': item.weather,
    }));
  },

  /**
   * Formata dados de consumo para CSV
   */
  formatConsumptionToCSV: (data: ConsumptionData[]): Array<Record<string, any>> => {
    return data.map((item) => ({
      Data: new Date(item.date).toLocaleDateString('pt-BR'),
      'Consumo Total (kWh)': item.consumption.toFixed(2),
      'Horário de Ponta (kWh)': item.peak.toFixed(2),
      'Fora de Ponta (kWh)': item.offPeak.toFixed(2),
      'Custo (R$)': item.cost.toFixed(2),
    }));
  },

  /**
   * Exporta estatísticas em formato legível
   */
  exportStatsAsText: (
    stats: ProductionStats | ConsumptionStats,
    filename: string
  ): void => {
    const isProduction = 'totalProduction' in stats;

    let text = isProduction
      ? '=== ESTATÍSTICAS DE PRODUÇÃO ===\n\n'
      : '=== ESTATÍSTICAS DE CONSUMO ===\n\n';

    Object.entries(stats).forEach(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());

      let formattedValue = value;
      if (typeof value === 'number') {
        if (key.includes('percentage') || key.includes('efficiency')) {
          formattedValue = `${value.toFixed(2)}%`;
        } else if (key.includes('cost') || key.includes('economy') || key.includes('savings')) {
          formattedValue = `R$ ${value.toFixed(2)}`;
        } else if (key.includes('consumption') || key.includes('production')) {
          formattedValue = `${value.toFixed(2)} kWh`;
        } else if (key.includes('power')) {
          formattedValue = `${value} W`;
        } else {
          formattedValue = value.toString();
        }
      }

      text += `${formattedKey}: ${formattedValue}\n`;
    });

    text += `\n\nGerado em: ${new Date().toLocaleString('pt-BR')}`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename.endsWith('.txt') ? filename : `${filename}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Verifica se formato é suportado
   */
  isSupportedFormat: (format: string): boolean => {
    return ['csv', 'xlsx', 'pdf', 'json', 'txt'].includes(format.toLowerCase());
  },

  /**
   * Retorna extensão do arquivo baseado no formato
   */
  getFileExtension: (format: string): string => {
    const extensions: Record<string, string> = {
      csv: 'csv',
      xlsx: 'xlsx',
      pdf: 'pdf',
      json: 'json',
      txt: 'txt',
    };
    return extensions[format.toLowerCase()] || format;
  },
};