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
        <span className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wide uppercase select-none">
          {label}
        </span>
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`flex items-center justify-between w-full py-2.5 px-4 rounded-xl border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--color-text-primary)] text-sm font-medium outline-none transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isOpen ? 'border-primary ring-4 ring-[var(--color-primary-glow)]' : ''
          } ${
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
              : ''
          }`}
        >
          <span className="flex items-center gap-2.5 truncate">
            {selectedOption?.icon}
            <span className={selectedOption ? '' : 'text-[var(--color-text-muted)] font-normal'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform duration-250 shrink-0 ${
              isOpen ? 'rotate-180 text-primary' : ''
            }`}
          />
        </button>

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl shadow-[0_10px_30px_rgba(123,87,223,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden z-50 animate-fade-in py-1.5 max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="py-2.5 px-4 text-sm text-[var(--color-text-muted)] text-center">
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
                    className={`flex items-center gap-2.5 w-full py-2.5 px-4 text-sm font-medium text-left border-none outline-none cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-[var(--sidebar-active-bg)] text-primary font-semibold'
                        : 'text-[var(--color-text-primary)] hover:bg-[var(--sidebar-active-bg)]/50 hover:text-primary'
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
