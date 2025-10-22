// Tipos relacionados ao consumo de energia

export type ConsumptionPeriod = 'daily' | 'monthly' | 'yearly';

export type TariffType = 'peak' | 'offPeak' | 'intermediate';

export interface ConsumptionData {
  id: string;
  userId: string;
  date: string;
  consumption: number; // kWh
  peak: number; // kWh no horário de ponta
  offPeak: number; // kWh fora de ponta
  intermediate?: number; // kWh intermediário
  cost: number; // R$
  createdAt: string;
}

export interface ConsumptionStats {
  totalConsumption: number; // kWh
  averageDailyConsumption: number; // kWh
  peakConsumption: number; // kWh
  offPeakConsumption: number; // kWh
  totalCost: number; // R$
  averageCost: number; // R$
  costWithoutSolar: number; // R$ - custo estimado sem energia solar
  savingsAmount: number; // R$ - economia gerada
  savingsPercentage: number; // %
  consumptionTrend: 'increasing' | 'decreasing' | 'stable';
  trendPercentage: number; // % de variação
}

export interface ConsumptionByHour {
  hour: number; // 0-23
  consumption: number; // kWh
  cost: number; // R$
  tariffType: TariffType;
}

export interface ConsumptionByDayOfWeek {
  dayOfWeek: number; // 0 (domingo) - 6 (sábado)
  dayName: string;
  averageConsumption: number; // kWh
  totalConsumption: number; // kWh
  cost: number; // R$
}

export interface ConsumptionComparison {
  period: string;
  currentConsumption: number; // kWh
  previousConsumption: number; // kWh
  variation: number; // %
  currentCost: number; // R$
  previousCost: number; // R$
  costVariation: number; // %
}

export interface ConsumptionForecast {
  period: string;
  expectedConsumption: number; // kWh
  estimatedCost: number; // R$
  confidence: number; // % - nível de confiança da previsão
  factors: string[]; // Fatores que influenciam a previsão
}

export interface TariffInfo {
  type: TariffType;
  rate: number; // R$/kWh
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  description: string;
}

export interface EnergyBill {
  id: string;
  userId: string;
  referenceMonth: string; // YYYY-MM
  consumption: number; // kWh
  production: number; // kWh
  surplus: number; // kWh
  cost: number; // R$
  credits: number; // R$ - créditos de energia
  taxes: number; // R$
  totalAmount: number; // R$
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'canceled';
  invoiceUrl?: string;
  createdAt: string;
}

export interface ConsumptionAlert {
  id: string;
  userId: string;
  type: 'high_consumption' | 'unusual_pattern' | 'cost_limit' | 'peak_usage';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  date: string;
  read: boolean;
  data?: any;
}

export interface ConsumptionInsight {
  id: string;
  type: 'tip' | 'warning' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  impact?: string; // Impacto potencial (ex: "Economize até R$ 50/mês")
  actionable: boolean;
  action?: string;
  createdAt: string;
}

export interface GetConsumptionQuery {
  period: ConsumptionPeriod;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  groupBy?: 'hour' | 'day' | 'week' | 'month';
}

export interface ConsumptionReport {
  period: string;
  consumption: ConsumptionData[];
  stats: ConsumptionStats;
  byHour?: ConsumptionByHour[];
  byDayOfWeek?: ConsumptionByDayOfWeek[];
  comparison?: ConsumptionComparison;
  insights: ConsumptionInsight[];
  alerts: ConsumptionAlert[];
}

export interface ExportConsumptionOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  period: ConsumptionPeriod;
  startDate?: string;
  endDate?: string;
  includeCharts?: boolean;
  includeInsights?: boolean;
}