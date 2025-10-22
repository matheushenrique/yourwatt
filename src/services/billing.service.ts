import api from './api';
import { BillingInfo } from '../types/user.types';

export const billingService = {
  /**
   * Obter fatura atual do usuário
   */
  async getCurrent(): Promise<BillingInfo> {
    const response = await api.get('/billing/current');
    return response.data;
  },

  /**
   * Obter histórico completo de faturas
   */
  async getHistory(startDate?: string, endDate?: string): Promise<Array<{
    id: string;
    month: string;
    year: number;
    consumption: number;
    energyInjected: number;
    costWithSolar: number;
    costWithoutSolar: number;
    savings: number;
    savingsPercentage: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
    paidDate?: string;
    paymentMethod?: string;
  }>> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/billing/history?${params.toString()}`);
    return response.data;
  },

  /**
   * Obter detalhes completos de uma fatura específica
   */
  async getById(billingId: string): Promise<{
    id: string;
    userId: string;
    month: string;
    year: number;
    consumption: number;
    energyInjected: number;
    costWithSolar: number;
    costWithoutSolar: number;
    savings: number;
    savingsPercentage: number;
    baseFee: number;
    energyCost: number;
    taxes: number;
    status: string;
    dueDate: string;
    paidDate?: string;
    paymentMethod?: string;
    details: Array<{
      description: string;
      quantity: string;
      unitPrice: number;
      cost: number;
    }>;
    taxBreakdown: Array<{
      name: string;
      percentage: number;
      amount: number;
    }>;
  }> {
    const response = await api.get(`/billing/${billingId}`);
    return response.data;
  },

  /**
   * Obter estatísticas de faturamento do usuário
   */
  async getStats(): Promise<{
    totalSavings: number;
    averageMonthlyCost: number;
    totalPaid: number;
    pendingAmount: number;
    savingsPercentage: number;
    totalConsumption: number;
    totalEnergyInjected: number;
    yearToDateSavings: number;
  }> {
    const response = await api.get('/billing/stats');
    return response.data;
  },

  /**
   * Calcular simulação de economia baseado no consumo
   */
  async calculateSavings(consumption: number, tariff?: number): Promise<{
    consumption: number;
    withSolar: number;
    withoutSolar: number;
    savings: number;
    savingsPercentage: number;
    paybackMonths: number;
    roi: number;
  }> {
    const response = await api.post('/billing/calculate', { consumption, tariff });
    return response.data;
  },

  /**
   * Marcar fatura como paga (Admin)
   */
  async markAsPaid(billingId: string, paidDate?: string, paymentMethod?: string): Promise<void> {
    await api.patch(`/admin/billing/${billingId}/mark-paid`, { paidDate, paymentMethod });
  },

  /**
   * Gerar fatura manualmente (Admin)
   */
  async generate(userId: string, month: number, year: number, data?: {
    consumption?: number;
    energyInjected?: number;
  }): Promise<{
    id: string;
    message: string;
  }> {
    const response = await api.post('/admin/billing/generate', {
      userId,
      month,
      year,
      ...data
    });
    return response.data;
  },

  /**
   * Exportar fatura em PDF
   */
  async exportPDF(billingId: string): Promise<Blob> {
    const response = await api.get(`/billing/${billingId}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Enviar fatura por email
   */
  async sendByEmail(billingId: string, email?: string): Promise<void> {
    await api.post(`/billing/${billingId}/send-email`, { email });
  },

  /**
   * Obter comparativo anual de custos
   */
  async getYearlyComparison(year: number): Promise<{
    year: number;
    totalWithSolar: number;
    totalWithoutSolar: number;
    totalSavings: number;
    savingsPercentage: number;
    monthlyBreakdown: Array<{
      month: number;
      monthName: string;
      withSolar: number;
      withoutSolar: number;
      savings: number;
      consumption: number;
    }>;
  }> {
    const response = await api.get(`/billing/yearly/${year}`);
    return response.data;
  },

  /**
   * Obter próximo vencimento
   */
  async getNextDueDate(): Promise<{
    dueDate: string;
    estimatedAmount: number;
    estimatedConsumption: number;
    daysRemaining: number;
    isPaid: boolean;
  }> {
    const response = await api.get('/billing/next-due');
    return response.data;
  },

  /**
   * Configurar pagamento automático
   */
  async setupAutoPay(enabled: boolean, paymentMethodId?: string): Promise<void> {
    await api.post('/billing/auto-pay', { enabled, paymentMethodId });
  },

  /**
   * Obter status do pagamento automático
   */
  async getAutoPayStatus(): Promise<{
    enabled: boolean;
    paymentMethod?: {
      id: string;
      type: string;
      lastFourDigits: string;
    };
  }> {
    const response = await api.get('/billing/auto-pay');
    return response.data;
  },

  /**
   * Obter métodos de pagamento cadastrados
   */
  async getPaymentMethods(): Promise<Array<{
    id: string;
    type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'pix';
    brand?: string;
    lastFourDigits?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
    createdAt: string;
  }>> {
    const response = await api.get('/billing/payment-methods');
    return response.data;
  },

  /**
   * Adicionar novo método de pagamento
   */
  async addPaymentMethod(data: {
    type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'pix';
    token: string;
    setAsDefault?: boolean;
  }): Promise<{ id: string; message: string }> {
    const response = await api.post('/billing/payment-methods', data);
    return response.data;
  },

  /**
   * Remover método de pagamento
   */
  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    await api.delete(`/billing/payment-methods/${paymentMethodId}`);
  },

  /**
   * Definir método de pagamento padrão
   */
  async setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
    await api.patch(`/billing/payment-methods/${paymentMethodId}/set-default`);
  },

  /**
   * Processar pagamento de uma fatura
   */
  async processPayment(billingId: string, paymentMethodId: string): Promise<{
    success: boolean;
    transactionId: string;
    message: string;
  }> {
    const response = await api.post(`/billing/${billingId}/pay`, { paymentMethodId });
    return response.data;
  },

  /**
   * Obter histórico de transações
   */
  async getTransactions(limit?: number): Promise<Array<{
    id: string;
    billingId: string;
    amount: number;
    status: 'success' | 'failed' | 'pending' | 'refunded';
    paymentMethod: string;
    date: string;
    description: string;
  }>> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    
    const response = await api.get(`/billing/transactions?${params.toString()}`);
    return response.data;
  },

  /**
   * Solicitar reembolso
   */
  async requestRefund(billingId: string, reason: string): Promise<{
    success: boolean;
    refundId: string;
    message: string;
  }> {
    const response = await api.post(`/billing/${billingId}/refund`, { reason });
    return response.data;
  },

  /**
   * Obter detalhes de tarifas aplicadas
   */
  async getTariffDetails(): Promise<{
    baseTariff: number;
    peakTariff: number;
    offPeakTariff: number;
    taxes: Array<{
      name: string;
      percentage: number;
    }>;
    validFrom: string;
    validUntil: string;
  }> {
    const response = await api.get('/billing/tariff-details');
    return response.data;
  },

  /**
   * Obter simulação de conta para diferentes cenários
   */
  async simulateScenario(scenario: {
    consumption: number;
    solarInstalled: boolean;
    panelCapacity?: number;
  }): Promise<{
    estimatedCost: number;
    breakdown: Array<{
      item: string;
      value: number;
    }>;
    savings: number;
    recommendations: string[];
  }> {
    const response = await api.post('/billing/simulate', scenario);
    return response.data;
  },

  /**
   * Obter alertas de faturamento
   */
  async getAlerts(): Promise<Array<{
    id: string;
    type: 'overdue' | 'high_consumption' | 'payment_failed' | 'upcoming_due';
    message: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
    isRead: boolean;
  }>> {
    const response = await api.get('/billing/alerts');
    return response.data;
  },

  /**
   * Marcar alerta como lido
   */
  async markAlertAsRead(alertId: string): Promise<void> {
    await api.patch(`/billing/alerts/${alertId}/read`);
  },

  /**
   * Exportar histórico completo em Excel
   */
  async exportHistoryExcel(startDate?: string, endDate?: string): Promise<Blob> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/billing/export/excel?${params.toString()}`, {
      responseType: 'blob',
    });
    
    return response.data;
  },

  /**
   * Obter resumo financeiro anual
   */
  async getAnnualSummary(year: number): Promise<{
    year: number;
    totalPaid: number;
    totalSavings: number;
    averageMonthly: number;
    highestMonth: { month: string; amount: number };
    lowestMonth: { month: string; amount: number };
    totalConsumption: number;
    co2Avoided: number;
  }> {
    const response = await api.get(`/billing/annual-summary/${year}`);
    return response.data;
  },

  /**
   * Contestar fatura
   */
  async disputeBilling(billingId: string, dispute: {
    reason: string;
    description: string;
    attachments?: File[];
  }): Promise<{
    disputeId: string;
    message: string;
  }> {
    const formData = new FormData();
    formData.append('reason', dispute.reason);
    formData.append('description', dispute.description);
    
    if (dispute.attachments) {
      dispute.attachments.forEach((file, index) => {
        formData.append(`attachment${index}`, file);
      });
    }
    
    const response = await api.post(`/billing/${billingId}/dispute`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};