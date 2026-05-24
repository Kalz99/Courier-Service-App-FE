import React from 'react';

export interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  description?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  icon,
  description,
  name,
  disabled = false,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-row items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer select-none w-full transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-glow)] ${
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : checked
          ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_6px_20px_var(--color-primary-glow)] hover:border-primary-hover'
          : 'border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--color-text-primary)] hover:border-primary/45 hover:bg-[var(--sidebar-active-bg)]/20 hover:text-primary'
      } ${className}`}
      role="radio"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          onChange(value);
        }
      }}
    >
      {/* Hidden standard radio input for accessibility */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onChange(value)}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Icon container on the left */}
      {icon && (
        <div
          className={`flex items-center justify-center shrink-0 transition-all duration-200 p-2.5 rounded-xl ${
            checked
              ? 'text-primary bg-primary/10 scale-105'
              : 'text-[var(--color-text-muted)] bg-[var(--app-bg)] group-hover:text-primary group-hover:bg-primary/5 group-hover:scale-105'
          }`}
        >
          {icon}
        </div>
      )}

      {/* Text Container on the right of the icon */}
      <div className="flex flex-col text-left justify-center min-w-0 flex-1 pr-2">
        {/* Text Label / Name */}
        <span
          className={`text-xs font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
            checked ? 'text-primary' : 'text-[var(--color-text-primary)]'
          }`}
        >
          {label}
        </span>

        {/* Optional Description / Other word */}
        {description && (
          <span
            className={`text-[10px] mt-0.5 leading-snug font-normal transition-colors duration-200 whitespace-nowrap ${
              checked ? 'text-primary/75' : 'text-[var(--color-text-muted)]'
            }`}
          >
            {description}
          </span>
        )}
      </div>

      {/* Select indicator dot on the far right */}
      <div
        className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ml-auto transition-all duration-200 ${
          checked
            ? 'border-primary bg-primary scale-110'
            : 'border-[var(--color-text-muted)]/40 bg-transparent'
        }`}
      >
        {checked && (
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-scale-in" />
        )}
      </div>
    </div>
  );
};

export default RadioButton;

