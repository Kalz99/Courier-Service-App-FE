import {
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";

import { getAdminShipmentsApi, updateShipmentStatusApi } from "../services/shipment.service";
import type { Shipment } from "../types/customershipment.types";

export const useAdminShipments = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [copiedId, setCopiedId] = useState<string | null>(null);

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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchShipments(currentPage, searchTerm);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchShipments, currentPage, searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, startDate, endDate]);

    const handleCopy = useCallback((e: React.MouseEvent, trackingNum: string) => {
        e.stopPropagation();
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            navigator.clipboard.writeText(trackingNum)
                .then(() => {
                    setCopiedId(trackingNum);
                    setTimeout(() => setCopiedId(null), 1500);
                })
                .catch(() => fallbackCopy(trackingNum));
        } else {
            fallbackCopy(trackingNum);
        }
    }, []);

    const fallbackCopy = (trackingNum: string) => {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = trackingNum;
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const success = document.execCommand("copy");
            document.body.removeChild(textArea);
            if (success) {
                setCopiedId(trackingNum);
                setTimeout(() => setCopiedId(null), 1500);
            }
        } catch (err) {
            console.error("Secure copy fallback failed", err);
        }
    };

    const handleUpdateStatus = useCallback(async (id: string, newStatus: string) => {
        try {
            const existingShipment = shipments.find(s => s.id === id);
            if (existingShipment) {
                const STATUS_PROGRESSION = ["pending", "in_transit", "out_for_delivery", "delivered"];
                const currentIndex = STATUS_PROGRESSION.indexOf(existingShipment.status);
                const nextIndex = STATUS_PROGRESSION.indexOf(newStatus);
                if (nextIndex < currentIndex) {
                    alert("Cannot revert to a previous shipment status.");
                    return;
                }
            }


            const statusMap: Record<string, string> = {
                pending: "Pending",
                in_transit: "In Transit",
                out_for_delivery: "Out for Delivery",
                delivered: "Delivered"
            };
            const mappedStatus = statusMap[newStatus] || "Pending";

            await updateShipmentStatusApi(id, mappedStatus);
            setShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as any } : s));
        } catch (err: any) {
            alert(err?.response?.data?.message || "Failed to update status.");
        }
    }, [shipments]);

    const filteredShipments = useMemo(() => {
        return shipments.filter((shipment) => {
            const matchesSearch =
                shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.recipient.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (shipment.packageName && shipment.packageName.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;

            let matchesDate = true;
            if (startDate) {
                matchesDate = matchesDate && shipment.date >= startDate;
            }
            if (endDate) {
                matchesDate = matchesDate && shipment.date <= endDate;
            }

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [shipments, searchTerm, statusFilter, startDate, endDate]);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(filteredShipments.length / itemsPerPage));
    }, [filteredShipments]);

    const paginatedShipments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredShipments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredShipments, currentPage]);

    const startIndex = useMemo(() => {
        if (filteredShipments.length === 0) return 0;
        return (currentPage - 1) * itemsPerPage + 1;
    }, [filteredShipments, currentPage]);

    const endIndex = useMemo(() => {
        return Math.min(currentPage * itemsPerPage, filteredShipments.length);
    }, [filteredShipments, currentPage]);

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
