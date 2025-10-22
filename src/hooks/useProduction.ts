import { useState, useEffect, useCallback } from 'react';
import { productionService } from '../services/production.service';

export interface ProductionData {
  date: string;
  production: number;
  capacity: number;
  efficiency: number;
}

export interface ProductionStats {
  totalProduction: number;
  currentPower: number;
  systemEfficiency: number;
  activePanels: number;
  totalPanels: number;
  co2Saved: number;
  treesEquivalent: number;
  monthlyEconomy: number;
  averageDailyProduction: number;
}

export interface PanelStatus {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'inactive';
  currentPower: number;
  efficiency: number;
  lastUpdate: string;
  temperature?: number;
  voltage?: number;
}

export interface ProductionForecast {
  date: string;
  expectedProduction: number;
  weatherCondition: string;
  confidence: number;
}

interface UseProductionReturn {
  productionData: ProductionData[];
  productionStats: ProductionStats | null;
  panelsStatus: PanelStatus[];
  forecast: ProductionForecast | null;
  loading: boolean;
  error: string | null;
  fetchProductionData: (period: 'daily' | 'monthly' | 'yearly', startDate?: string, endDate?: string) => Promise<void>;
  fetchProductionStats: () => Promise<void>;
  fetchPanelsStatus: () => Promise<void>;
  fetchForecast: () => Promise<void>;
  exportProductionData: (format: 'csv' | 'xlsx' | 'pdf') => Promise<void>;
  refreshAll: () => Promise<void>;
  clearError: () => void;
}

export const useProduction = (): UseProductionReturn => {
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [productionStats, setProductionStats] = useState<ProductionStats | null>(null);
  const [panelsStatus, setPanelsStatus] = useState<PanelStatus[]>([]);
  const [forecast, setForecast] = useState<ProductionForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Buscar dados de produção por período
  const fetchProductionData = useCallback(async (
    period: 'daily' | 'monthly' | 'yearly',
    startDate?: string,
    endDate?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await productionService.getProductionData(period, startDate, endDate);
      setProductionData(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar dados de produção';
      setError(errorMessage);
      console.error('Erro ao buscar dados de produção:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar estatísticas de produção
  const fetchProductionStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const stats = await productionService.getProductionStats();
      setProductionStats(stats);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar estatísticas de produção';
      setError(errorMessage);
      console.error('Erro ao buscar estatísticas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar status dos painéis
  const fetchPanelsStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const panels = await productionService.getPanelsStatus();
      setPanelsStatus(panels);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar status dos painéis';
      setError(errorMessage);
      console.error('Erro ao buscar status dos painéis:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar previsão de produção
  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const forecastData = await productionService.getProductionForecast();
      setForecast(forecastData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar previsão';
      setError(errorMessage);
      console.error('Erro ao buscar previsão:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Exportar dados de produção
  const exportProductionData = useCallback(async (format: 'csv' | 'xlsx' | 'pdf') => {
    setLoading(true);
    setError(null);

    try {
      await productionService.exportData(format);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao exportar dados';
      setError(errorMessage);
      console.error('Erro ao exportar dados:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar todos os dados
  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        productionService.getProductionData('monthly').then(setProductionData),
        productionService.getProductionStats().then(setProductionStats),
        productionService.getPanelsStatus().then(setPanelsStatus),
        productionService.getProductionForecast().then(setForecast),
      ]);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao atualizar dados';
      setError(errorMessage);
      console.error('Erro ao atualizar dados:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    refreshAll();
  }, []);

  // Auto-refresh a cada 5 minutos (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      // Atualizar apenas stats e status dos painéis (dados em tempo real)
      Promise.all([
        productionService.getProductionStats().then(setProductionStats),
        productionService.getPanelsStatus().then(setPanelsStatus),
      ]).catch(err => {
        console.error('Erro no auto-refresh:', err);
      });
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  return {
    productionData,
    productionStats,
    panelsStatus,
    forecast,
    loading,
    error,
    fetchProductionData,
    fetchProductionStats,
    fetchPanelsStatus,
    fetchForecast,
    exportProductionData,
    refreshAll,
    clearError,
  };
};