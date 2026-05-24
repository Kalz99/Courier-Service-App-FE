import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder = 'Select an option',
  error,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    if (disabled) return;
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-1.5 w-full relative ${className}`}>
      {label && (
        <span className="text-xs font-semibold text-slate-500 tracking-wide select-none">
          {label}
        </span>
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`flex items-center justify-between w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-[var(--sidebar-border)] bg-white dark:bg-[var(--sidebar-bg)] text-slate-800 dark:text-[var(--color-text-primary)] text-sm font-semibold outline-none transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isOpen ? 'border-primary ring-4 ring-primary/10' : ''
          } ${
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
              : ''
          }`}
        >
          <span className="flex items-center gap-2.5 truncate">
            {selectedOption?.icon}
            <span className={selectedOption ? '' : 'text-slate-400 dark:text-[var(--color-text-muted)]/70 font-normal'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 dark:text-[var(--color-text-muted)]/70 transition-transform duration-250 shrink-0 ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
          />
        </button>

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[var(--sidebar-bg)] border border-slate-200 dark:border-[var(--sidebar-border)] rounded-2xl shadow-[0_10px_30px_rgba(123,87,223,0.15)] overflow-hidden z-50 animate-fade-in py-1.5 max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="py-2.5 px-4 text-sm text-slate-400 dark:text-[var(--color-text-muted)] text-center">
                No options available
              </div>
            ) : (
              options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex items-center gap-2.5 w-full py-2.5 px-4 text-sm font-bold text-left border-none outline-none cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-slate-700 dark:text-[var(--color-text-primary)] hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {option.icon}
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs font-medium text-red-500 transition-all duration-200">
          {error}
        </span>
      )}
    </div>
  );
};

export default Dropdown;
