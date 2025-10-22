import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { ConsumptionData, BillingInfo } from '../types/user.types';

export function useConsumptionHistory() {
  return useQuery<ConsumptionData[]>({
    queryKey: ['consumption', 'history'],
    queryFn: async () => {
      const response = await api.get('/consumption/history');
      return response.data;
    },
  });
}

export function useCurrentBilling() {
  return useQuery<BillingInfo>({
    queryKey: ['billing', 'current'],
    queryFn: async () => {
      const response = await api.get('/billing/current');
      return response.data;
    },
  });
}

export function useExportPDF() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get('/reports/consumption/pdf', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio-consumo-${new Date().toISOString()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}

export function useExportExcel() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.get('/reports/consumption/excel', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio-consumo-${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}