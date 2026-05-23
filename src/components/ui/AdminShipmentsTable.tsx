import React from 'react';
import { ShipmentsTable } from './ShipmentsTable/ShipmentsTable';
import { useAdminShipments } from '../../hooks/useAdminShipments';

export interface EntityDetails {
    name: string;
    mobile: string;
    address: string;
}

export interface ShipmentItem {
    id: string;
    trackingNumber: string;
    sender: EntityDetails;
    receiver: EntityDetails;
    packageName: string;
    packageType: string;
    weight: string;
    status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered';
    date: string;
}

export interface AdminShipmentsTableProps {
    className?: string;
    onViewShipment?: (id: string) => void;
    onPrintLabel?: (id: string) => void;
    onDeleteShipment?: (id: string) => void;
}

export const AdminShipmentsTable: React.FC<AdminShipmentsTableProps> = ({
    onViewShipment,
    onPrintLabel,
    onDeleteShipment,
    className = '',
}) => {
    const {
        paginatedShipments,
        loading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        totalPages,
        startIndex,
        endIndex,
        copiedId,
        handleCopy,
        shipments,
        handleUpdateStatus,
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange,
        onClearDates
    } = useAdminShipments();

    return (
        <ShipmentsTable
            role="admin"
            paginatedShipments={paginatedShipments}
            isLoading={loading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            copiedId={copiedId}
            onCopy={handleCopy}
            totalShipmentsCount={shipments.length}
            onUpdateStatus={handleUpdateStatus}
            onDeleteShipment={onDeleteShipment}
            onPrintLabel={onPrintLabel}
            onTrackShipment={onViewShipment}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            onClearDates={onClearDates}
            className={className}
        />
    );
};

export default AdminShipmentsTable;