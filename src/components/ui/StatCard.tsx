import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: string | React.ReactNode;
  iconBgClass?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBgClass = '',
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-3xl p-6 shadow-[var(--sidebar-shadow)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.04)] transition-all duration-200 ${className}`}>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-[var(--color-text-muted)]">{label}</span>
        <span className="text-[26px] font-bold text-[var(--color-text-primary)] leading-none">{value}</span>
      </div>
      <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${iconBgClass}`}>
        {typeof icon === 'string' ? (
          <span className="text-[22px]">{icon}</span>
        ) : (
          icon
        )}
      </div>
    </div>
  );
};

export default StatCard;
