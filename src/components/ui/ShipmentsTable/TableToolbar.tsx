import React from 'react';
import { Search } from 'lucide-react';
import { ShipmentStatusEnum } from './helpers';
import { Dropdown } from '../DropDown';
import { DateRangePicker } from '../DateRangePicker';

export interface TableToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
    
    // Date range filter props
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    onClearDates?: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = React.memo(({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onClearDates
}) => {
    // Premium Dropdown options with cohesive visual indicator dots matching our status theme
    const statusOptions = [
        { value: 'all', label: 'All Statuses' },
        { 
            value: ShipmentStatusEnum.PENDING, 
            label: 'Pending', 
            icon: <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
        },
        { 
            value: ShipmentStatusEnum.IN_TRANSIT, 
            label: 'In Transit', 
            icon: <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
        },
        { 
            value: ShipmentStatusEnum.OUT_FOR_DELIVERY, 
            label: 'Out for Delivery', 
            icon: <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
        },
        { 
            value: ShipmentStatusEnum.DELIVERED, 
            label: 'Delivered', 
            icon: <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.01)] relative z-40 overflow-visible">
            
            {/* Search Input Bar */}
            <div className="relative flex-1 w-full lg:max-w-xs xl:max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4.5 w-4.5 text-[var(--color-text-muted)]" />
                </div>
                <input
                    type="text"
                    aria-label="Search shipments"
                    placeholder="Search tracking ID, recipient, or item details..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--app-bg)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 text-xs border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-[var(--color-primary-glow)] transition-all duration-200 font-semibold"
                />
            </div>

            {/* Dynamic Filters Area: Dropdown status select + Date selectors */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto relative overflow-visible z-30 justify-end">
                {/* Status Dropdown Filter */}
                <div className="w-full sm:w-[170px] relative overflow-visible z-40">
                    <Dropdown
                        options={statusOptions}
                        selectedValue={statusFilter}
                        onChange={onStatusFilterChange}
                        placeholder="Filter Status"
                    />
                </div>

                {/* Reusable Date Range Picker Component */}
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                    onClear={onClearDates}
                    className="w-full sm:w-auto"
                />
            </div>

        </div>
    );
});

TableToolbar.displayName = 'TableToolbar';
