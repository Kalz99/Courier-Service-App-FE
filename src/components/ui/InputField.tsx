import React, { forwardRef } from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wide uppercase select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 flex items-center justify-center text-[var(--color-text-muted)] pointer-events-none transition-colors duration-200">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full py-2.5 px-4 rounded-xl border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--color-text-primary)] text-sm font-medium outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-[var(--color-primary-glow)] disabled:opacity-50 disabled:cursor-not-allowed ${
              icon ? 'pl-11' : ''
            } ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
                : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs font-medium text-red-500 transition-all duration-200">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
