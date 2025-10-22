// Constantes do sistema de energia solar

/**
 * URLs da API
 */
export const API_URLS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  AUTH: '/auth',
  USERS: '/users',
  CONSUMPTION: '/consumption',
  PRODUCTION: '/production',
  BILLING: '/billing',
  REPORTS: '/reports',
  ANALYTICS: '/analytics',
} as const;

/**
 * Endpoints de autenticação
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  GOOGLE: '/auth/google',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
} as const;

/**
 * Roles de usuários
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

/**
 * Status de usuário
 */
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

/**
 * Períodos de análise
 */
export const PERIODS = {
  DAILY: 'daily',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

/**
 * Status dos painéis solares
 */
export const PANEL_STATUS = {
  ACTIVE: 'active',
  WARNING: 'warning',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;

/**
 * Condições climáticas
 */
export const WEATHER_CONDITIONS = {
  SUNNY: 'sunny',
  PARTLY_CLOUDY: 'partly_cloudy',
  CLOUDY: 'cloudy',
  RAINY: 'rainy',
  STORMY: 'stormy',
} as const;

/**
 * Tipos de tarifa
 */
export const TARIFF_TYPES = {
  PEAK: 'peak',
  OFF_PEAK: 'offPeak',
  INTERMEDIATE: 'intermediate',
} as const;

/**
 * Horários de tarifa (horário de Brasília)
 */
export const TARIFF_SCHEDULES = {
  PEAK_START: '18:00',
  PEAK_END: '21:00',
  OFF_PEAK_START: '00:00',
  OFF_PEAK_END: '17:59',
} as const;

/**
 * Tarifas de energia (R$/kWh) - valores médios
 */
export const ENERGY_RATES = {
  PEAK: 0.89, // R$/kWh - horário de ponta
  OFF_PEAK: 0.52, // R$/kWh - fora de ponta
  INTERMEDIATE: 0.65, // R$/kWh - intermediário
  AVERAGE: 0.65, // R$/kWh - média
} as const;

/**
 * Status de faturas
 */
export const BILL_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELED: 'canceled',
} as const;

/**
 * Métodos de pagamento
 */
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_SLIP: 'bank_slip',
  PIX: 'pix',
} as const;

/**
 * Tipos de manutenção
 */
export const MAINTENANCE_TYPES = {
  PREVENTIVE: 'preventive',
  CORRECTIVE: 'corrective',
  INSPECTION: 'inspection',
} as const;

/**
 * Tipos de alerta
 */
export const ALERT_TYPES = {
  HIGH_CONSUMPTION: 'high_consumption',
  UNUSUAL_PATTERN: 'unusual_pattern',
  COST_LIMIT: 'cost_limit',
  PEAK_USAGE: 'peak_usage',
  LOW_EFFICIENCY: 'low_efficiency',
  HIGH_TEMPERATURE: 'high_temperature',
  CONNECTION_ISSUE: 'connection_issue',
  PHYSICAL_DAMAGE: 'physical_damage',
} as const;

/**
 * Níveis de severidade
 */
export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  INFO: 'info',
  WARNING: 'warning',
} as const;

/**
 * Formatos de exportação
 */
export const EXPORT_FORMATS = {
  CSV: 'csv',
  XLSX: 'xlsx',
  PDF: 'pdf',
} as const;

/**
 * Limites de dados
 */
export const DATA_LIMITS = {
  MAX_CONSUMPTION: 1000000, // kWh
  MAX_PRODUCTION: 1000000, // kWh
  MAX_POWER: 10000000, // W
  MAX_VOLTAGE: 1000, // V
  MAX_CURRENT: 100, // A
  MIN_TEMPERATURE: -50, // °C
  MAX_TEMPERATURE: 150, // °C
  MAX_EFFICIENCY: 100, // %
  MIN_EFFICIENCY: 0, // %
} as const;

/**
 * Valores padrão de paginação
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * Intervalos de atualização (em milissegundos)
 */
export const REFRESH_INTERVALS = {
  REAL_TIME: 5000, // 5 segundos
  STATS: 60000, // 1 minuto
  PANELS: 300000, // 5 minutos
  FORECAST: 3600000, // 1 hora
} as const;

/**
 * Durações de sessão
 */
export const SESSION_DURATION = {
  TOKEN_EXPIRY: 3600, // 1 hora (em segundos)
  REFRESH_TOKEN_EXPIRY: 604800, // 7 dias (em segundos)
  REMEMBER_ME_EXPIRY: 2592000, // 30 dias (em segundos)
} as const;

/**
 * Mensagens padrão do sistema
 */
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    LOGOUT: 'Logout realizado com sucesso!',
    REGISTER: 'Cadastro realizado com sucesso!',
    UPDATE: 'Dados atualizados com sucesso!',
    DELETE: 'Dados excluídos com sucesso!',
    EXPORT: 'Dados exportados com sucesso!',
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para acessar este recurso.',
    NOT_FOUND: 'Recurso não encontrado.',
    VALIDATION: 'Dados inválidos. Verifique os campos.',
    SERVER: 'Erro no servidor. Tente novamente mais tarde.',
  },
  LOADING: {
    DEFAULT: 'Carregando...',
    SAVING: 'Salvando...',
    DELETING: 'Excluindo...',
    EXPORTING: 'Exportando...',
  },
} as const;

/**
 * Cores do sistema (Tailwind)
 */
export const COLORS = {
  PRIMARY: 'blue',
  SUCCESS: 'green',
  WARNING: 'amber',
  DANGER: 'red',
  INFO: 'cyan',
  SOLAR: 'orange',
  PRODUCTION: 'green',
  CONSUMPTION: 'red',
  SURPLUS: 'blue',
  ECONOMY: 'amber',
} as const;

/**
 * Ícones por status
 */
export const STATUS_ICONS = {
  ACTIVE: '✓',
  WARNING: '⚠',
  INACTIVE: '✗',
  MAINTENANCE: '🔧',
  PENDING: '⏳',
  PAID: '✓',
  OVERDUE: '⚠',
  CANCELED: '✗',
} as const;

/**
 * Fatores de conversão ambiental
 */
export const ENVIRONMENTAL_FACTORS = {
  CO2_PER_KWH: 0.000625, // toneladas de CO2 por kWh
  TREES_PER_TON_CO2: 45, // árvores equivalentes por tonelada de CO2
  CARS_OFF_ROAD_PER_TON: 0.21, // carros fora da rua por tonelada de CO2
  WATER_SAVED_PER_KWH: 1.5, // litros de água por kWh
  COAL_PER_KWH: 0.5, // kg de carvão por kWh
  HOMES_PER_KW: 0.3, // casas que podem ser alimentadas por kW
} as const;

/**
 * Configurações de gráficos
 */
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 400,
  ANIMATION_DURATION: 300,
  COLORS: {
    PRODUCTION: '#10b981',
    CONSUMPTION: '#ef4444',
    SURPLUS: '#3b82f6',
    ECONOMY: '#f59e0b',
    CAPACITY: '#6366f1',
    EFFICIENCY: '#8b5cf6',
  },
} as const;

/**
 * Regex patterns
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  PHONE: /^[1-9]{2}9?[0-9]{8}$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  CEP: /^\d{5}-?\d{3}$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
  SERIAL_NUMBER: /^[A-Z0-9-]{5,20}$/,
} as const;

/**
 * Configurações do Google OAuth
 */
export const GOOGLE_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  SCOPES: ['email', 'profile'],
} as const;

/**
 * Rotas da aplicação
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CONSUMPTION: '/consumption',
  PRODUCTION: '/production',
  BILLING: '/billing',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_PRODUCTION: '/admin/production',
  ADMIN_CLIENTS: '/admin/clients',
} as const;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
} as const;