// Tipos relacionados a usuários

export type UserRole = 'user' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserProfile extends User {
  solarSystem?: SolarSystemInfo;
  billing?: BillingInfo;
  preferences?: UserPreferences;
}

export interface SolarSystemInfo {
  installedCapacity: number; // kWp
  panelsCount: number;
  installationDate: string;
  inverterModel: string;
  panelModel: string;
  warrantyExpiration: string;
}

export interface BillingInfo {
  cpfCnpj: string;
  companyName?: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'bank_slip' | 'pix';
  cardLastDigits?: string;
  billingDay: number;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  alerts: {
    lowProduction: boolean;
    systemFailure: boolean;
    maintenanceReminder: boolean;
  };
  language: 'pt-BR' | 'en-US' | 'es-ES';
  theme: 'light' | 'dark' | 'auto';
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
  address?: Address;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: Partial<Address>;
  preferences?: Partial<UserPreferences>;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface GoogleLoginCredentials {
  credential: string;
}

export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}