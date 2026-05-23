import React from 'react';
import { TableToolbar } from './TableToolbar';
import { TableSkeleton } from './TableSkeleton';
import { EmptyState } from './EmptyState';
import { TablePagination } from './TablePagination';
import { ShipmentRow } from './ShipmentRow';
import type { ShipmentItem } from '../../../types/customershipment.types';

export interface CustomerShipmentsTableProps {
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
}

export const CustomerShipmentsTable: React.FC<CustomerShipmentsTableProps> = React.memo(({
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
}) => {
    const hasRecords = paginatedShipments.length > 0;

    return (
        <div className={`w-full flex flex-col gap-5 ${className}`}>
            <TableToolbar
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={onStatusFilterChange}
            />

            <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] overflow-hidden">
                <div className="overflow-x-auto w-full">
                    {isLoading || hasRecords ? (
                        <table className="w-full min-w-[900px] border-collapse text-left text-sm select-none">
                            <thead>
                                <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[18%]">
                                        Tracking Number
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[30%]">
                                        Recipient Details
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[30%]">
                                        Package Details
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[26%]">
                                        Status
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[6%] text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--sidebar-border)]/50">
                                {isLoading ? (
                                    <TableSkeleton />
                                ) : (
                                    paginatedShipments.map((shipment) => (
                                        <ShipmentRow
                                            key={shipment.id}
                                            shipment={shipment}
                                            copiedId={copiedId}
                                            onCopy={onCopy}
                                            onTrackShipment={onTrackShipment}
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
        </div>
    );
});

CustomerShipmentsTable.displayName = 'CustomerShipmentsTable';
