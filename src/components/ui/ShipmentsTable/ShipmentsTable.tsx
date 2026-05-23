import React, { useState } from 'react';
import {
    Check,
    Copy,
    User,
    Phone,
    MapPin,
    Package,
    Inbox,
    Layers,
    ShieldAlert,
    HeartPulse,
    Search,
    ChevronDown,
    Printer,
    Trash2,
    Eye,
    Truck,
    Compass,
    Clock,
    CheckCircle2
} from 'lucide-react';
import type { Shipment } from '../../types/customershipment.types';
import { TablePagination } from '../CustomerShipmentsTable/TablePagination';
import { EmptyState } from '../CustomerShipmentsTable/EmptyState';
import { TableSkeleton } from '../CustomerShipmentsTable/TableSkeleton';
import { TrackingModal } from '../TrackingDetailsModal';
import { Dropdown } from '../DropDown';

// Status labels & styles helper
export const ShipmentStatusEnum = {
    PENDING: "pending",
    IN_TRANSIT: "in_transit",
    OUT_FOR_DELIVERY: "out_for_delivery",
    DELIVERED: "delivered",
} as const;

const PACKAGE_TYPE_LABELS: Record<string, string> = {
    document: 'Document / Letter',
    package_box: 'Standard Package',
    pallet: 'Pallet / Bulk Crate',
    perishable: 'Perishable Goods',
    medical: 'Pharmaceutical',
};

const getStatusStyles = (status: string) => {
    switch (status) {
        case ShipmentStatusEnum.DELIVERED:
            return {
                bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
                text: 'text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                dot: 'bg-emerald-500',
                icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Delivered',
            };
        case ShipmentStatusEnum.IN_TRANSIT:
            return {
                bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
                text: 'text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
                dot: 'bg-indigo-500',
                icon: <Truck className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'In Transit',
            };
        case ShipmentStatusEnum.OUT_FOR_DELIVERY:
            return {
                bg: 'bg-blue-500/10 dark:bg-blue-500/15',
                text: 'text-blue-600 dark:text-blue-400 border border-blue-500/20',
                dot: 'bg-blue-500',
                icon: <Compass className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Out for Delivery',
            };
        default:
            return {
                bg: 'bg-amber-500/10 dark:bg-amber-500/15',
                text: 'text-amber-600 dark:text-amber-400 border border-amber-500/20',
                dot: 'bg-amber-500',
                icon: <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Pending',
            };
    }
};

const getPackageIcon = (type: string) => {
    switch (type) {
        case 'document':
            return <Inbox className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'package_box':
            return <Package className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'pallet':
            return <Layers className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'perishable':
            return <ShieldAlert className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'medical':
            return <HeartPulse className="w-3.5 h-3.5 text-primary shrink-0" />;
        default:
            return <Package className="w-3.5 h-3.5 text-primary shrink-0" />;
    }
};

const TABS = [
    { value: 'all', label: 'All' },
    { value: ShipmentStatusEnum.PENDING, label: 'Pending' },
    { value: ShipmentStatusEnum.IN_TRANSIT, label: 'In Transit' },
    { value: ShipmentStatusEnum.OUT_FOR_DELIVERY, label: 'Out for Delivery' },
    { value: ShipmentStatusEnum.DELIVERED, label: 'Delivered' }
];

export interface ShipmentsTableProps {
    role: "admin" | "customer";
    paginatedShipments: Shipment[];
    isLoading: boolean;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    copiedId: string | null;
    onCopy: (e: React.MouseEvent, trackingNum: string) => void;
    totalShipmentsCount: number;
    onUpdateStatus?: (id: string, status: string) => Promise<any>;
    onDeleteShipment?: (id: string) => void;
    onPrintLabel?: (id: string) => void;
    onTrackShipment?: (id: string) => void;
    startDate?: string;
    endDate?: string;
    onStartDateChange?: (val: string) => void;
    onEndDateChange?: (val: string) => void;
    onClearDates?: () => void;
    className?: string;
}

const StatusBadgeSelector: React.FC<{
    status: string;
    onUpdateStatus?: (status: string) => void;
    disabled?: boolean;
}> = ({ status, onUpdateStatus, disabled }) => {
    const styleInfo = getStatusStyles(status);

    if (disabled || !onUpdateStatus) {
        return (
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider select-none ${styleInfo.bg} ${styleInfo.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${styleInfo.dot}`} />
                {styleInfo.label}
            </div>
        );
    }

    const statuses = [
        { value: 'pending', label: 'Pending', icon: <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> },
        { value: 'in_transit', label: 'In Transit', icon: <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> },
        { value: 'out_for_delivery', label: 'Out For Delivery', icon: <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> },
        { value: 'delivered', label: 'Delivered', icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> }
    ];

    return (
        <div className="w-44">
            <Dropdown
                options={statuses}
                selectedValue={status}
                onChange={onUpdateStatus}
                placeholder="Update Status"
            />
        </div>
    );
};

export const ShipmentsTable: React.FC<ShipmentsTableProps> = React.memo(({
    role,
    paginatedShipments = [],
    isLoading = false,
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    currentPage,
    onPageChange,
    totalPages,
    startIndex,
    endIndex,
    copiedId,
    onCopy,
    totalShipmentsCount,
    onUpdateStatus,
    onDeleteShipment,
    onPrintLabel,
    onTrackShipment,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onClearDates,
    className = '',
}) => {
    const hasRecords = paginatedShipments.length > 0;
    const isAdmin = role === 'admin';

    // Modal state for quick tracking view
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string | null>(null);

    // Status options for dropdown filter
    const statusOptions = [
        { value: 'all', label: 'All Statuses', icon: <Layers className="w-3.5 h-3.5 opacity-80" /> },
        { value: 'pending', label: 'Pending', icon: <Clock className="w-3.5 h-3.5 text-amber-500 opacity-80" /> },
        { value: 'in_transit', label: 'In Transit', icon: <Truck className="w-3.5 h-3.5 text-indigo-500 opacity-80" /> },
        { value: 'out_for_delivery', label: 'Out for Delivery', icon: <Compass className="w-3.5 h-3.5 text-blue-500 opacity-80" /> },
        { value: 'delivered', label: 'Delivered', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 opacity-80" /> }
    ];

    const handleTrackShipment = (trackingNumber: string) => {
        if (onTrackShipment) {
            onTrackShipment(trackingNumber);
        } else {
            setSelectedTrackingNumber(trackingNumber);
            setIsModalOpen(true);
        }
    };

    return (
        <div className={`w-full flex flex-col gap-5 ${className}`}>
            
            {/* Toolbar */}
            <div className="flex flex-col gap-4 w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                    {/* Left controls: Search & Status Dropdown or Tabs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 w-full">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-4.5 w-4.5 text-[var(--color-text-muted)]" />
                            </div>
                            <input
                                type="text"
                                aria-label="Search shipments"
                                placeholder={isAdmin ? "Search tracking #, recipient, customer..." : "Search by tracking #, recipient name, address..."}
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[var(--app-bg)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 text-sm border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-[var(--color-primary-glow)] transition-all duration-200 font-semibold"
                            />
                        </div>

                        {/* Status Filter */}
                        {isAdmin ? (
                            <div className="w-full sm:w-40 shrink-0">
                                <Dropdown
                                    options={statusOptions}
                                    selectedValue={statusFilter}
                                    onChange={onStatusFilterChange}
                                    placeholder="Filter by status"
                                />
                            </div>
                        ) : (
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
                                                ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_2px_10px_var(--color-primary-glow)] font-bold'
                                                : 'border-[var(--sidebar-border)] bg-[var(--app-bg)] text-[var(--color-text-muted)] hover:border-primary/30 hover:text-primary font-medium'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right controls: Date Range (Admin Only) */}
                    {isAdmin && (onStartDateChange || onEndDateChange) && (
                        <div className="flex flex-wrap items-center gap-2 bg-[var(--app-bg)]/40 border border-[var(--sidebar-border)]/50 rounded-xl p-2 shrink-0 w-full md:w-auto">
                            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider px-1">Date:</span>
                            <input
                                type="date"
                                aria-label="Start date"
                                value={startDate || ''}
                                onChange={(e) => onStartDateChange?.(e.target.value)}
                                className="px-2.5 py-1.5 bg-[var(--sidebar-bg)] text-[var(--color-text-primary)] border border-[var(--sidebar-border)] rounded-lg text-xs font-bold focus:outline-none focus:border-primary transition-all duration-200 cursor-pointer"
                            />
                            <span className="text-xs text-[var(--color-text-muted)] font-bold">to</span>
                            <input
                                type="date"
                                aria-label="End date"
                                value={endDate || ''}
                                onChange={(e) => onEndDateChange?.(e.target.value)}
                                className="px-2.5 py-1.5 bg-[var(--sidebar-bg)] text-[var(--color-text-primary)] border border-[var(--sidebar-border)] rounded-lg text-xs font-bold focus:outline-none focus:border-primary transition-all duration-200 cursor-pointer"
                            />
                            {(startDate || endDate) && onClearDates && (
                                <button
                                    onClick={onClearDates}
                                    className="px-2 py-1 text-xs font-extrabold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/15 rounded-lg border border-red-500/20 cursor-pointer transition-all duration-200"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Table Core */}
            <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] overflow-hidden">
                <div className="overflow-x-auto w-full">
                    {isLoading || hasRecords ? (
                        <table className="w-full min-w-[1100px] border-collapse text-left text-sm select-none">
                            <thead>
                                <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                    <th className={`py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] ${isAdmin ? 'w-[14%]' : 'w-[18%]'}`}>
                                        Tracking Number
                                    </th>
                                    {isAdmin && (
                                        <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[16%]">
                                            Sender / Customer
                                        </th>
                                    )}
                                    <th className={`py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] ${isAdmin ? 'w-[20%]' : 'w-[28%]'}`}>
                                        Recipient Details
                                    </th>
                                    <th className={`py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] ${isAdmin ? 'w-[20%]' : 'w-[28%]'}`}>
                                        Package Details
                                    </th>
                                    <th className={`py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] ${isAdmin ? 'w-[20%]' : 'w-[20%]'}`}>
                                        Status
                                    </th>
                                    <th className={`py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] text-center ${isAdmin ? 'w-[10%]' : 'w-[6%]'}`}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                             <tbody className="divide-y divide-[var(--sidebar-border)]/50">
                                {isLoading ? (
                                    <TableSkeleton role={role} />
                                ) : (
                                    paginatedShipments.map((shipment) => {
                                        const isCopied = copiedId === shipment.trackingNumber;
                                        return (
                                             <tr key={shipment.id} className="hover:bg-[var(--sidebar-active-bg)]/20 transition-colors duration-150 group">
                                                {/* Tracking ID column */}
                                                <td className="py-4.5 px-6 font-mono font-semibold text-[var(--color-text-primary)]">
                                                    <div className="flex items-center gap-2">
                                                        <span className="tracking-tight text-xs select-all">{shipment.trackingNumber}</span>
                                                        <button
                                                            onClick={(e) => onCopy(e, shipment.trackingNumber)}
                                                            title="Copy Tracking ID"
                                                            className={`p-1 rounded-md border border-[var(--sidebar-border)] bg-[var(--app-bg)] cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 ${isCopied ? 'text-emerald-500 border-emerald-500/30' : 'text-[var(--color-text-muted)]'}`}
                                                        >
                                                            {isCopied ? (
                                                                <Check className="w-3 h-3 animate-scale-in" />
                                                            ) : (
                                                                <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Sender / Customer details (Admin Only) */}
                                                {isAdmin && (
                                                    <td className="py-4.5 px-6">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="font-bold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                                                                <User className="w-3 h-3 text-indigo-500 shrink-0 opacity-80" />
                                                                {shipment.customerName || "Anonymous Sender"}
                                                            </span>
                                                            {shipment.customerPhoneNumber && (
                                                                <span className="text-[11px] text-[var(--color-text-muted)] font-medium flex items-center gap-1.5 leading-none">
                                                                    <Phone className="w-2.5 h-2.5 text-[var(--color-text-muted)]/70 shrink-0" />
                                                                    {shipment.customerPhoneNumber}
                                                                </span>
                                                            )}
                                                            {shipment.customerAddress && (
                                                                <span className="text-[11px] text-[var(--color-text-muted)]/90 font-medium flex items-start gap-1.5 leading-snug">
                                                                    <MapPin className="w-3 h-3 text-[var(--color-text-muted)]/70 shrink-0 mt-0.5" />
                                                                    <span className="line-clamp-1">{shipment.customerAddress}</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                )}

                                                {/* Recipient details column */}
                                                <td className="py-4.5 px-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-bold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                                                            <User className="w-3 h-3 text-primary shrink-0 opacity-80" />
                                                            {shipment.recipient.name}
                                                        </span>
                                                        <span className="text-[11px] text-[var(--color-text-muted)] font-medium flex items-center gap-1.5 leading-none">
                                                            <Phone className="w-2.5 h-2.5 text-[var(--color-text-muted)]/70 shrink-0" />
                                                            {shipment.recipient.mobile}
                                                        </span>
                                                        <span className="text-[11px] text-[var(--color-text-muted)]/90 font-medium flex items-start gap-1.5 leading-snug">
                                                            <MapPin className="w-3 h-3 text-[var(--color-text-muted)]/70 shrink-0 mt-0.5" />
                                                            <span className="line-clamp-2 leading-relaxed">{shipment.recipient.address}</span>
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Package details column */}
                                                <td className="py-4.5 px-6 text-left">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex items-center justify-center p-1.5 rounded-md bg-primary/10 border border-primary/15 shrink-0 transition-transform duration-200 group-hover:scale-105">
                                                            {getPackageIcon(shipment.packageType)}
                                                        </div>
                                                        <div className="flex flex-col gap-0.5 min-w-0">
                                                            <span className="font-bold text-xs text-[var(--color-text-primary)] truncate leading-tight">
                                                                {shipment.packageName}
                                                            </span>
                                                            <span className="text-[10px] text-[var(--color-text-muted)] font-semibold capitalize leading-none">
                                                                {PACKAGE_TYPE_LABELS[shipment.packageType] || 'Standard Package'}
                                                            </span>
                                                            <span className="text-[10px] text-primary font-bold leading-none mt-0.5">
                                                                {shipment.weight}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status column (with dropdown if Admin) */}
                                                <td className="py-4.5 px-6">
                                                    <StatusBadgeSelector
                                                        status={shipment.status}
                                                        disabled={!isAdmin}
                                                        onUpdateStatus={onUpdateStatus ? (newStatus) => onUpdateStatus(shipment.id, newStatus) : undefined}
                                                    />
                                                </td>

                                                {/* Actions column */}
                                                <td className="py-4.5 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button
                                                            onClick={() => handleTrackShipment(shipment.trackingNumber)}
                                                            title="Track Shipment"
                                                            className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all cursor-pointer"
                                                        >
                                                            <Eye className="w-3 h-3" />
                                                        </button>
                                                        {isAdmin && onPrintLabel && (
                                                            <button
                                                                onClick={() => onPrintLabel(shipment.id)}
                                                                title="Print Label"
                                                                className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                                                            >
                                                                <Printer className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                        {isAdmin && onDeleteShipment && (
                                                            <button
                                                                onClick={() => onDeleteShipment(shipment.id)}
                                                                title="Delete Shipment"
                                                                className="p-1.5 rounded-lg bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <EmptyState />
                    )}
                </div>

                {/* Pagination */}
                {!isLoading && (
                    <TablePagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalShipmentsCount={totalShipmentsCount}
                    />
                )}
            </div>

            {/* Tracking Modal */}
            <TrackingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                trackingNumber={selectedTrackingNumber}
            />
        </div>
    );
});

ShipmentsTable.displayName = 'ShipmentsTable';
