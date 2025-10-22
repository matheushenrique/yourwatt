import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
  headerAction?: ReactNode;
  bordered?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  className = '',
  hover = false,
  padding = 'md',
  footer,
  headerAction,
  bordered = false,
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm overflow-hidden
        ${bordered ? 'border border-gray-200' : ''}
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {(title || subtitle || icon || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {icon && (
                <div className="flex-shrink-0">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-0.5 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}

// StatCard Component - Para estatísticas
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  subtitle?: string;
  onClick?: () => void;
  loading?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  trend,
  subtitle,
  onClick,
  loading = false,
}: StatCardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm p-6 transition-all duration-300 border border-gray-100
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''}
        ${loading ? 'animate-pulse' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-xl shadow-sm`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        {trend && !loading && (
          <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${
            trend.isPositive 
              ? 'text-green-700 bg-green-50' 
              : 'text-red-700 bg-red-50'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      
      {loading ? (
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
      ) : (
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      )}
      
      {subtitle && !loading && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
      
      {trend?.label && !loading && (
        <p className="text-xs text-gray-400 mt-1">{trend.label}</p>
      )}
    </div>
  );
}

// InfoCard Component - Para informações destacadas
interface InfoCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
}

export function InfoCard({ label, value, icon, color = 'blue', size = 'md' }: InfoCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const sizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div className={`${colors[color]} border rounded-xl ${sizes[size]} flex items-center gap-3 shadow-sm`}>
      {icon && <div className="flex-shrink-0 opacity-80">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium opacity-75 truncate">{label}</p>
        <p className="text-lg font-bold truncate mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// EmptyCard Component - Para estados vazios
interface EmptyCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'compact';
}

export function EmptyCard({ icon, title, description, action, variant = 'default' }: EmptyCardProps) {
  const padding = variant === 'compact' ? 'p-8' : 'p-12';
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${padding} text-center`}>
      {icon && (
        <div className="flex justify-center mb-4 text-gray-300">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// GradientCard Component - Card com gradiente
interface GradientCardProps {
  children: ReactNode;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  className?: string;
}

export function GradientCard({ children, gradient = 'blue', className = '' }: GradientCardProps) {
  const gradients = {
    blue: 'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    pink: 'from-pink-500 to-pink-700',
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[gradient]} rounded-xl shadow-lg p-6 text-white ${className}`}>
      {children}
    </div>
  );
}