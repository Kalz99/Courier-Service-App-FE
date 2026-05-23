import React from 'react';
import { Calendar, X } from 'lucide-react';

export interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    onClear?: () => void;
    className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = React.memo(({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onClear,
    className = ''
}) => {
    const hasActiveFilter = startDate || endDate;

    return (
        <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[var(--app-bg)]/20 border border-[var(--sidebar-border)] rounded-xl p-2 md:py-1.5 md:px-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-colors duration-250 ${className}`}>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider select-none shrink-0 pl-1">
                <Calendar className="w-3.5 h-3.5 text-primary opacity-80" />
                <span>Date:</span>
            </div>

            <div className="flex items-center gap-2 grow">
                {/* Start Date Input */}
                <input
                    type="date"
                    aria-label="Filter start date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="w-full sm:w-[130px] p-2 bg-[var(--app-bg)] text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--sidebar-border)] rounded-lg focus:outline-none focus:border-primary transition-all cursor-pointer dark:color-scheme-dark"
                />

                <span className="text-[11px] font-bold text-[var(--color-text-muted)] select-none">to</span>

                {/* End Date Input */}
                <input
                    type="date"
                    aria-label="Filter end date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="w-full sm:w-[130px] p-2 bg-[var(--app-bg)] text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--sidebar-border)] rounded-lg focus:outline-none focus:border-primary transition-all cursor-pointer dark:color-scheme-dark"
                />

                {/* Clear Reset Trigger */}
                {hasActiveFilter && onClear && (
                    <button
                        type="button"
                        onClick={onClear}
                        title="Clear Date Filters"
                        className="p-1.5 rounded-md hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-500 transition-colors border border-[var(--sidebar-border)]/50 bg-[var(--app-bg)] shrink-0 cursor-pointer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
});

// Set displayName for optimization
DateRangePicker.displayName = 'DateRangePicker';
