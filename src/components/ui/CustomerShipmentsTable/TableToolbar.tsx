import React from 'react';
import { Search } from 'lucide-react';
import { ShipmentStatusEnum } from './helpers';

export interface TableToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
}

const TABS = [
    { value: 'all', label: 'All' },
    { value: ShipmentStatusEnum.PENDING, label: 'Pending' },
    { value: ShipmentStatusEnum.IN_TRANSIT, label: 'In Transit' },
    { value: ShipmentStatusEnum.OUT_FOR_DELIVERY, label: 'Out for Delivery' },
    { value: ShipmentStatusEnum.DELIVERED, label: 'Delivered' }
];

export const TableToolbar: React.FC<TableToolbarProps> = React.memo(({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4.5 w-4.5 text-[var(--color-text-muted)]" />
                </div>
                <input
                    type="text"
                    aria-label="Search shipments"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--app-bg)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 text-sm border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-[var(--color-primary-glow)] transition-all duration-200"
                />
            </div>

            {/* Status Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0" role="tablist" aria-label="Filter shipments by status">
                <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mr-2 hidden md:inline-block">
                    Filter:
                </span>
                {TABS.map((tab) => {
                    const isActive = statusFilter === tab.value;
                    return (
                        <button
                            key={tab.value}
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Filter by ${tab.label}`}
                            onClick={() => onStatusFilterChange(tab.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border cursor-pointer select-none transition-all duration-200 ${isActive
                                ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_2px_10px_var(--color-primary-glow)]'
                                : 'border-[var(--sidebar-border)] bg-[var(--app-bg)] text-[var(--color-text-muted)] hover:border-primary/30 hover:text-primary'
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

TableToolbar.displayName = 'TableToolbar';
