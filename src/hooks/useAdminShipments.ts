import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAdminShipmentsApi, updateShipmentStatusApi } from '../services/shipment.service';
import type { Shipment } from '../types/customershipment.types';

export const useAdminShipments = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Search and Status Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Date range filters
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Copying tracking ID state
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchShipments = useCallback(async (page: number, search?: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAdminShipmentsApi(page, itemsPerPage, search);
            setShipments(data);
        } catch (error: unknown) {
            let message = "Failed to load shipments";
            if (error instanceof Error) {
                message = error.message;
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounced fetch on search and page change
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchShipments(currentPage, searchTerm);
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [fetchShipments, currentPage, searchTerm]);

    // Reset pagination on filter modifications
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, startDate, endDate]);

    // Handler to copy tracking ID
    const handleCopy = useCallback((e: React.MouseEvent, trackingNum: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(trackingNum).then(() => {
            copiedIdState(trackingNum);
        });
    }, []);

    const copiedIdState = (trackingNum: string) => {
        setCopiedId(trackingNum);
        setTimeout(() => setCopiedId(null), 1500);
    };

    // Handler to update shipment status
    const handleUpdateStatus = useCallback(async (id: string, newStatus: string) => {
        try {
            // Zod validation on backend uses Title Case statuses ("Pending", "In Transit", "Out for Delivery", "Delivered", "Cancelled")
            // Map the frontend status value safely to match Zod expectation
            const statusMap: Record<string, string> = {
                pending: 'Pending',
                in_transit: 'In Transit',
                out_for_delivery: 'Out for Delivery',
                delivered: 'Delivered'
            };
            const mappedStatus = statusMap[newStatus] || 'Pending';

            await updateShipmentStatusApi(id, mappedStatus);
            // Instantly update local state to reflect change beautifully
            setShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as any } : s));
        } catch (err: any) {
            alert(err?.response?.data?.message || 'Failed to update status.');
        }
    }, []);

    // Filter shipments by status and date range
    const filteredShipments = useMemo(() => {
        return shipments.filter((s) => {
            const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

            let matchesDate = true;
            if (startDate) {
                matchesDate = matchesDate && s.date >= startDate;
            }
            if (endDate) {
                matchesDate = matchesDate && s.date <= endDate;
            }

            return matchesStatus && matchesDate;
        });
    }, [shipments, statusFilter, startDate, endDate]);

    // Paginate shipments
    const paginatedShipments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredShipments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredShipments, currentPage]);

    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredShipments.length);

    return {
        shipments: filteredShipments,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        copiedId,
        handleCopy,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedShipments,
        startIndex,
        endIndex,
        handleUpdateStatus,
        startDate,
        endDate,
        onStartDateChange: setStartDate,
        onEndDateChange: setEndDate,
        onClearDates: () => {
            setStartDate("");
            setEndDate("");
        },
        refreshShipments: () => fetchShipments(currentPage, searchTerm)
    };
};

export default useAdminShipments;
