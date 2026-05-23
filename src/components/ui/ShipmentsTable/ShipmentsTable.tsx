import React, { useState } from 'react';
import { TableToolbar } from './TableToolbar';
import { TableSkeleton } from './TableSkeleton';
import { EmptyState } from './EmptyState';
import { TablePagination } from './TablePagination';
import { ShipmentRow } from './ShipmentRow';
import { TrackingModal } from '../TrackingDetailsModal';
import type { ShipmentItem } from '../../../types/customershipment.types';

export interface ShipmentsTableProps {
    paginatedShipments: ShipmentItem[];
    isLoading?: boolean;
    onTrackShipment?: (trackingNumber: string) => void;
    className?: string;
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
    
    // Admin support props
    role?: 'customer' | 'admin';
    onUpdateStatus?: (id: string, newStatus: any) => void;
    onDeleteShipment?: (id: string) => void;
    onPrintLabel?: (id: string) => void;

    // Date range filter props
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    onClearDates?: () => void;
}

export const ShipmentsTable: React.FC<ShipmentsTableProps> = React.memo(({
    paginatedShipments = [],
    isLoading = false,
    onTrackShipment,
    className = '',
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
    role = 'customer',
    onUpdateStatus,
    onDeleteShipment,
    onPrintLabel,
    startDate = '',
    endDate = '',
    onStartDateChange,
    onEndDateChange,
    onClearDates
}) => {
    const hasRecords = paginatedShipments.length > 0;
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string | null>(null);

    const handleTrackShipment = (trackingNumber: string) => {
        setSelectedTrackingNumber(trackingNumber);
        setIsModalOpen(true);
    };

    // Dynamically configure column schema based on current role
    const columns = [
        { label: 'Tracking Number', width: role === 'admin' ? '15%' : '18%' },
        ...(role === 'admin' ? [
            { label: 'Customer Details', width: '18%' }
        ] : []),
        { label: 'Recipient Details', width: role === 'admin' ? '22%' : '28%' },
        ...(role === 'admin' ? [
            { label: 'Package Type', width: '20%' }
        ] : [
            { label: 'Package Details', width: '28%' }
        ]),
        { label: 'Status', width: role === 'admin' ? '17%' : '20%' },
        { label: 'Action', width: role === 'admin' ? '8%' : '6%', align: 'center' }
    ];

    return (
        <div className={`w-full flex flex-col gap-5 ${className}`}>
            <TableToolbar
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={onStatusFilterChange}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
                onClearDates={onClearDates}
            />

            <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] overflow-visible">
                <div className="w-full md:overflow-visible overflow-x-auto">
                    {isLoading || hasRecords ? (
                        <table className="w-full min-w-[900px] border-collapse text-left text-sm select-none">
                            <thead>
                                <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                    {columns.map((col, idx) => (
                                        <th 
                                            key={idx}
                                            className={`py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none ${col.align === 'center' ? 'text-center' : ''}`}
                                            style={{ width: col.width }}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--sidebar-border)]/50">
                                {isLoading ? (
                                    <TableSkeleton role={role} />
                                ) : (
                                    paginatedShipments.map((shipment) => (
                                        <ShipmentRow
                                            key={shipment.id}
                                            shipment={shipment}
                                            copiedId={copiedId}
                                            onCopy={onCopy}
                                            onTrackShipment={onTrackShipment ?? handleTrackShipment}
                                            role={role}
                                            onUpdateStatus={onUpdateStatus}
                                            onDeleteShipment={onDeleteShipment}
                                            onPrintLabel={onPrintLabel}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <EmptyState />
                    )}
                </div>

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
            {/** Tracking Modal **/}
            <TrackingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                trackingNumber={selectedTrackingNumber}
            />
        </div>
    );
});

ShipmentsTable.displayName = 'ShipmentsTable';
