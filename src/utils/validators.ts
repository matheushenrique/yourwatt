// Funções de validação para o sistema

/**
 * Valida formato de email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida senha forte
 * Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Valida CPF
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
};

/**
 * Valida CNPJ
 */
export const validateCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
  
  // Valida primeiro dígito verificador
  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  const digits = cleanCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  // Valida segundo dígito verificador
  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  
  return true;
};

/**
 * Valida telefone brasileiro
 * Aceita formatos: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^[1-9]{2}9?[0-9]{8}$/.test(cleanPhone);
};

/**
 * Valida CEP
 */
export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return /^[0-9]{8}$/.test(cleanCEP);
};

/**
 * Valida URL
 */
export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida número positivo
 */
export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

/**
 * Valida número não negativo
 */
export const validateNonNegativeNumber = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

/**
 * Valida range de números
 */
export const validateNumberRange = (value: number, min: number, max: number): boolean => {
  return !isNaN(value) && value >= min && value <= max;
};

/**
 * Valida data no formato YYYY-MM-DD
 */
export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

/**
 * Valida se a data está no futuro
 */
export const validateFutureDate = (date: string): boolean => {
  if (!validateDate(date)) return false;
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj > today;
};

/**
 * Valida se a data está no passado
 */
export const validatePastDate = (date: string): boolean => {
  if (!validateDate(date)) return false;
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj < today;
};

/**
 * Valida horário no formato HH:MM
 */
export const validateTime = (time: string): boolean => {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Valida string não vazia
 */
export const validateNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Valida comprimento mínimo de string
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Valida comprimento máximo de string
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Valida se duas senhas são iguais
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};

/**
 * Valida percentual (0-100)
 */
export const validatePercentage = (value: number): boolean => {
  return validateNumberRange(value, 0, 100);
};

/**
 * Valida energia em kWh (deve ser positivo)
 */
export const validateEnergy = (value: number): boolean => {
  return validatePositiveNumber(value) && value < 1000000; // limite razoável
};

/**
 * Valida potência em Watts (deve ser positivo)
 */
export const validatePower = (value: number): boolean => {
  return validatePositiveNumber(value) && value < 10000000; // limite razoável
};

/**
 * Valida eficiência do painel (0-100%)
 */
export const validateEfficiency = (value: number): boolean => {
  return validatePercentage(value);
};

/**
 * Valida temperatura (-50 a 150°C)
 */
export const validateTemperature = (value: number): boolean => {
  return validateNumberRange(value, -50, 150);
};

/**
 * Valida voltagem (0-1000V)
 */
export const validateVoltage = (value: number): boolean => {
  return validateNumberRange(value, 0, 1000);
};

/**
 * Valida corrente (0-100A)
 */
export const validateCurrent = (value: number): boolean => {
  return validateNumberRange(value, 0, 100);
};

/**
 * Valida valor monetário (deve ser não negativo)
 */
export const validateMonetaryValue = (value: number): boolean => {
  return validateNonNegativeNumber(value) && value < 1000000000; // limite razoável
};

/**
 * Valida número de série (alfanumérico com hífen)
 */
export const validateSerialNumber = (serialNumber: string): boolean => {
  const serialRegex = /^[A-Z0-9-]{5,20}$/;
  return serialRegex.test(serialNumber);
};

/**
 * Retorna mensagem de erro para validação de email
 */
export const getEmailError = (email: string): string | null => {
  if (!email) return 'Email é obrigatório';
  if (!validateEmail(email)) return 'Email inválido';
  return null;
};

/**
 * Retorna mensagem de erro para validação de senha
 */
export const getPasswordError = (password: string): string | null => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 8) return 'Senha deve ter no mínimo 8 caracteres';
  if (!validatePassword(password)) {
    return 'Senha deve conter letra maiúscula, minúscula e número';
  }
  return null;
};

/**
 * Retorna mensagem de erro para validação de CPF
 */
export const getCPFError = (cpf: string): string | null => {
  if (!cpf) return 'CPF é obrigatório';
  if (!validateCPF(cpf)) return 'CPF inválido';
  return null;
};

/**
 * Retorna mensagem de erro para validação de telefone
 */
export const getPhoneError = (phone: string): string | null => {
  if (!phone) return 'Telefone é obrigatório';
  if (!validatePhone(phone)) return 'Telefone inválido';
  return null;
};

/**
 * Retorna mensagem de erro para validação de CEP
 */
export const getCEPError = (cep: string): string | null => {
  if (!cep) return 'CEP é obrigatório';
  if (!validateCEP(cep)) return 'CEP inválido';
  return null;
};