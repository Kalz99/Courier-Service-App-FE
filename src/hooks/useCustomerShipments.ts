import {
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";

import { getCustomerShipmentsApi } from "../services/shipment.service";
import type { Shipment } from "../types/customershipment.types";

export const useCustomerShipments = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Search and Status Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Copying tracking ID state
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchShipments = useCallback(async (search?: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getCustomerShipmentsApi(search);
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

    // Debounced fetch on search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchShipments(searchTerm);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchShipments, searchTerm]);

    // Reset pagination on filter modifications
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    // Secure fallback clipboard copy
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

    // Filter Logic
    const filteredShipments = useMemo(() => {
        return shipments.filter((shipment) => {
            const matchesSearch =
                shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.recipient.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.packageName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [shipments, searchTerm, statusFilter]);

    // Pagination Computations
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
        shipments,
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
        refreshShipments: () => fetchShipments(searchTerm),
    };
};

export default useCustomerShipments;