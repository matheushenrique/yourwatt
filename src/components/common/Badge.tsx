import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  icon?: ReactNode;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  rounded = true,
  icon
}: BadgeProps) {
  const variants = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-semibold border
        ${variants[variant]}
        ${sizes[size]}
        ${rounded ? 'rounded-full' : 'rounded'}
      `}
    >
      {icon}
      {children}
    </span>
  );
}

// StatusBadge Component
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success';
  label?: string;
  withDot?: boolean;
}

export function StatusBadge({ status, label, withDot = true }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-800',
      dotColor: 'bg-green-500',
      label: label || 'Ativo'
    },
    inactive: {
      color: 'bg-gray-100 text-gray-800',
      dotColor: 'bg-gray-500',
      label: label || 'Inativo'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      dotColor: 'bg-yellow-500',
      label: label || 'Pendente'
    },
    error: {
      color: 'bg-red-100 text-red-800',
      dotColor: 'bg-red-500',
      label: label || 'Erro'
    },
    success: {
      color: 'bg-green-100 text-green-800',
      dotColor: 'bg-green-500',
      label: label || 'Sucesso'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${config.color}`}>
      {withDot && (
        <span className={`w-2 h-2 rounded-full ${config.dotColor} ${status === 'active' ? 'animate-pulse' : ''}`} />
      )}
      {config.label}
    </span>
  );
}

// CountBadge Component
interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'primary' | 'danger';
}

export function CountBadge({ count, max = 99, variant = 'primary' }: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  const variants = {
    primary: 'bg-blue-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  if (count === 0) return null;

  return (
    <span className={`
      inline-flex items-center justify-center
      min-w-[20px] h-5 px-1.5
      text-xs font-bold rounded-full
      ${variants[variant]}
    `}>
      {displayCount}
    </span>
  );
}