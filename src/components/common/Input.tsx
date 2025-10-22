import { InputHTMLAttributes, ReactNode, forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
  fullWidth?: boolean;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    icon, 
    helperText, 
    fullWidth = false, 
    showPasswordToggle = false,
    className = '', 
    type = 'text',
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full px-4 py-2.5 border rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              placeholder:text-gray-400
              ${icon ? 'pl-10' : ''}
              ${(type === 'password' && showPasswordToggle) ? 'pr-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
              ${props.disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
              ${className}
            `}
            {...props}
          />

          {type === 'password' && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    showCharCount = false,
    maxLength,
    className = '', 
    ...props 
  }, ref) => {
    const [charCount, setCharCount] = useState(0);

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          maxLength={maxLength}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            if (props.onChange) props.onChange(e);
          }}
          className={`
            w-full px-4 py-2.5 border rounded-lg resize-y
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            placeholder:text-gray-400
            min-h-[100px]
            ${error ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
            ${className}
          `}
          {...props}
        />

        {(showCharCount || maxLength) && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {charCount}{maxLength && ` / ${maxLength}`}
            </span>
          </div>
        )}

        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select Component
interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, fullWidth = false, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5 border rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            appearance-none
            bg-no-repeat bg-right
            ${error ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
            ${className}
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Checkbox Component
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-5 h-5 text-blue-600 border-gray-300 rounded
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
              transition-all cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {label}
            </span>
            {helperText && (
              <p className="text-sm text-gray-500 mt-1">{helperText}</p>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Radio Component
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, className = '', ...props }, ref) => {
    return (
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="radio"
            className={`
              w-5 h-5 text-blue-600 border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
              transition-all cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {label}
            </span>
            {helperText && (
              <p className="text-sm text-gray-500 mt-1">{helperText}</p>
            )}
          </div>
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';