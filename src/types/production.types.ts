// Tipos relacionados à produção de energia solar

export type ProductionPeriod = 'daily' | 'monthly' | 'yearly';

export type PanelStatusType = 'active' | 'warning' | 'inactive' | 'maintenance';

export type WeatherCondition = 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'stormy';

export interface ProductionData {
  id: string;
  userId: string;
  date: string;
  production: number; // kWh
  capacity: number; // kWh - capacidade instalada
  efficiency: number; // % - eficiência real vs capacidade
  peakPower: number; // W - pico de potência
  averagePower: number; // W - potência média
  sunHours: number; // horas de sol efetivas
  weather: WeatherCondition;
  createdAt: string;
}

export interface ProductionStats {
  totalProduction: number; // kWh
  currentPower: number; // W - potência atual em tempo real
  systemEfficiency: number; // % - eficiência geral do sistema
  activePanels: number;
  totalPanels: number;
  inactivePanels: number;
  warningPanels: number;
  co2Saved: number; // toneladas
  treesEquivalent: number; // árvores equivalentes
  monthlyEconomy: number; // R$
  yearlyEconomy: number; // R$
  averageDailyProduction: number; // kWh
  bestProductionDay: string;
  bestProductionValue: number; // kWh
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface PanelStatus {
  id: string;
  name: string;
  serialNumber: string;
  status: PanelStatusType;
  currentPower: number; // W
  efficiency: number; // %
  temperature?: number; // °C
  voltage?: number; // V
  current?: number; // A
  lastUpdate: string;
  installationDate: string;
  maintenanceHistory?: MaintenanceRecord[];
  alerts?: PanelAlert[];
}

export interface MaintenanceRecord {
  id: string;
  panelId: string;
  date: string;
  type: 'preventive' | 'corrective' | 'inspection';
  description: string;
  technician: string;
  cost?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
}

export interface PanelAlert {
  id: string;
  panelId: string;
  type: 'low_efficiency' | 'high_temperature' | 'connection_issue' | 'physical_damage';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  detectedAt: string;
  resolvedAt?: string;
  status: 'active' | 'resolved' | 'ignored';
}

export interface ProductionForecast {
  date: string;
  expectedProduction: number; // kWh
  minProduction: number; // kWh - cenário pessimista
  maxProduction: number; // kWh - cenário otimista
  weatherCondition: WeatherCondition;
  temperature: number; // °C
  cloudCover: number; // %
  confidence: number; // % - nível de confiança
  sunriseTime: string;
  sunsetTime: string;
}

export interface ProductionByHour {
  hour: number; // 0-23
  production: number; // kWh
  power: number; // W
  efficiency: number; // %
  irradiance: number; // W/m²
}

export interface ProductionComparison {
  period: string;
  currentProduction: number; // kWh
  previousProduction: number; // kWh
  variation: number; // %
  expectedProduction: number; // kWh
  performanceRate: number; // % - taxa de performance vs esperado
}

export interface SystemPerformance {
  performanceRatio: number; // % - PR (Performance Ratio)
  capacityFactor: number; // %
  availabilityRate: number; // %
  degradationRate: number; // % por ano
  expectedLifespan: number; // anos restantes
  totalLifespan: number; // anos total
  systemAge: number; // anos desde instalação
}

export interface EnvironmentalImpact {
  co2Avoided: number; // toneladas
  treesEquivalent: number;
  carsOffRoad: number; // equivalente em carros
  waterSaved: number; // litros
  coalNotBurned: number; // kg
  homesEquivalent: number; // casas que poderiam ser alimentadas
}

export interface InverterData {
  id: string;
  model: string;
  serialNumber: string;
  status: 'online' | 'offline' | 'error';
  inputVoltage: number; // V
  inputCurrent: number; // A
  outputVoltage: number; // V
  outputCurrent: number; // A
  frequency: number; // Hz
  temperature: number; // °C
  efficiency: number; // %
  totalProduction: number; // kWh acumulado
  lastUpdate: string;
}

export interface ProductionReport {
  period: string;
  production: ProductionData[];
  stats: ProductionStats;
  byHour?: ProductionByHour[];
  comparison?: ProductionComparison;
  forecast?: ProductionForecast[];
  systemPerformance: SystemPerformance;
  environmentalImpact: EnvironmentalImpact;
  panels: PanelStatus[];
  inverters: InverterData[];
  alerts: PanelAlert[];
  recommendations: string[];
}

export interface GetProductionQuery {
  period: ProductionPeriod;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  groupBy?: 'hour' | 'day' | 'week' | 'month';
  includeForecast?: boolean;
  includeDetails?: boolean;
}

export interface ExportProductionOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  period: ProductionPeriod;
  startDate?: string;
  endDate?: string;
  includeCharts?: boolean;
  includePanelsStatus?: boolean;
  includeEnvironmentalImpact?: boolean;
}

export interface ProductionOptimization {
  currentEfficiency: number; // %
  potentialEfficiency: number; // %
  improvementPercentage: number; // %
  estimatedGain: number; // kWh/mês
  recommendations: OptimizationRecommendation[];
}

export interface OptimizationRecommendation {
  id: string;
  type: 'cleaning' | 'angle_adjustment' | 'shading_removal' | 'equipment_upgrade' | 'maintenance';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  estimatedImpact: string; // ex: "+5% eficiência"
  estimatedCost?: number; // R$
  paybackPeriod?: number; // meses
}