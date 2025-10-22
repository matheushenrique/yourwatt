import { ReactNode } from 'react';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'blue' | 'white' | 'gray';
}

export default function Loading({
  size = 'md',
  fullScreen = false,
  text,
  variant = 'spinner',
  color = 'blue'
}: LoadingProps) {
  const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const colors = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  const dotSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      {variant === 'spinner' && (
        <div
          className={`animate-spin rounded-full border-b-2 ${colors[color]} ${sizes[size]}`}
        />
      )}

      {variant === 'dots' && (
        <div className="flex gap-2">
          <div className={`${dotSizes[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`${dotSizes[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`${dotSizes[size]} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      )}

      {variant === 'pulse' && (
        <div className={`bg-blue-600 rounded-full animate-pulse ${sizes[size]}`} />
      )}

      {variant === 'bars' && (
        <div className="flex items-center gap-1">
          <div className="w-1 h-8 bg-blue-600 animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-10 bg-blue-600 animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-6 bg-blue-600 animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="w-1 h-8 bg-blue-600 animate-pulse" style={{ animationDelay: '450ms' }}></div>
        </div>
      )}

      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}

// Skeleton Component
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  count?: number;
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  count = 1
}: SkeletonProps) {
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  const skeletonElement = (
    <div
      className={`bg-gray-200 ${variants[variant]} ${animations[animation]} ${className}`}
      style={style}
    />
  );

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>{skeletonElement}</div>
        ))}
      </div>
    );
  }

  return skeletonElement;
}

// TableSkeleton Component
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export function TableSkeleton({ rows = 5, columns = 4, showHeader = true }: TableSkeletonProps) {
  return (
    <div className="space-y-3">
      {showHeader && (
        <div className="flex gap-4 pb-3 border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// CardSkeleton Component
interface CardSkeletonProps {
  count?: number;
  layout?: 'grid' | 'list';
}

export function CardSkeleton({ count = 1, layout = 'grid' }: CardSkeletonProps) {
  const gridClass = layout === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
    : 'space-y-4';

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

// LoadingOverlay Component
interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
  children: ReactNode;
  blur?: boolean;
}

export function LoadingOverlay({ visible, text, children, blur = true }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {visible && (
        <div className={`absolute inset-0 bg-white ${blur ? 'bg-opacity-90 backdrop-blur-sm' : 'bg-opacity-75'} flex items-center justify-center z-10 rounded-lg transition-all`}>
          <Loading text={text} />
        </div>
      )}
    </div>
  );
}

// Progress Component
interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
  showLabel = false,
  label,
  animated = false
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    indigo: 'bg-indigo-600',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">{label}</span>
          {showLabel && <span className="font-semibold">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-500 ease-out ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// CircularProgress Component
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  showLabel?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'blue',
  showLabel = true
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    blue: '#3b82f6',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#f59e0b',
    purple: '#a855f7',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xl font-bold text-gray-900">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
}

// Spinner Component (inline)
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'gray' | 'current';
}

export function Spinner({ size = 'md', color = 'blue' }: SpinnerProps) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const colors = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
    current: 'border-current',
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${sizes[size]} ${colors[color]}`}
    />
  );
}