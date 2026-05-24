import {
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";

import { getAllAdminShipmentsApi, updateShipmentStatusApi } from "../services/shipment.service";
import type { Shipment } from "../types/customershipment.types";
import { useToast } from "../context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 10;

export const useAdminShipments = () => {
    const { showToast } = useToast();
    const queryClient = useQueryClient();

    // ─── Raw server data ──────────────────────────────────────────────
    const [allShipments, setAllShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ─── Filter state ─────────────────────────────────────────────────
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // ─── Pagination state ─────────────────────────────────────────────
    const [currentPage, setCurrentPage] = useState(1);

    // ─── Clipboard state ──────────────────────────────────────────────
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // ─── Initial fetch (all records, client handles pagination) ───────
    const fetchShipments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllAdminShipmentsApi();
            setAllShipments(data);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to load shipments";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchShipments();
    }, [fetchShipments]);

    // ─── Reset to page 1 whenever filters change ──────────────────────
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, startDate, endDate]);

    // ─── Debounced search: no extra fetch needed ──────────────────────
    // (all data is already in memory)

    // ─── Client-side filtering ────────────────────────────────────────
    const filteredShipments = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return allShipments.filter((s) => {
            const matchesSearch =
                !term ||
                s.trackingNumber.toLowerCase().includes(term) ||
                s.recipient.name.toLowerCase().includes(term) ||
                s.recipient.address.toLowerCase().includes(term) ||
                (s.customerName ?? "").toLowerCase().includes(term) ||
                (s.packageName ?? "").toLowerCase().includes(term);

            const matchesStatus =
                statusFilter === "all" || s.status === statusFilter;

            const matchesDate =
                (!startDate || s.date >= startDate) &&
                (!endDate || s.date <= endDate);

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [allShipments, searchTerm, statusFilter, startDate, endDate]);

    // ─── Derived pagination values ────────────────────────────────────
    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(filteredShipments.length / ITEMS_PER_PAGE)),
        [filteredShipments.length]
    );

    const paginatedShipments = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredShipments.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredShipments, currentPage]);

    const startIndex = useMemo(
        () => (filteredShipments.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1),
        [filteredShipments.length, currentPage]
    );

    const endIndex = useMemo(
        () => Math.min(currentPage * ITEMS_PER_PAGE, filteredShipments.length),
        [filteredShipments.length, currentPage]
    );

    // ─── Status update ────────────────────────────────────────────────
    const handleUpdateStatus = useCallback(
        async (id: string, newStatus: string) => {
            const STATUS_PROGRESSION = [
                "pending",
                "in_transit",
                "out_for_delivery",
                "delivered",
            ] as const;

            const existing = allShipments.find((s) => s.id === id);
            if (existing) {
                const currentIdx = STATUS_PROGRESSION.indexOf(existing.status as any);
                const nextIdx = STATUS_PROGRESSION.indexOf(newStatus as any);
                if (nextIdx < currentIdx) {
                    showToast("Cannot revert to a previous shipment status.", "warning");
                    return;
                }
            }

            const statusMap: Record<string, string> = {
                pending: "Pending",
                in_transit: "In Transit",
                out_for_delivery: "Out for Delivery",
                delivered: "Delivered",
            };

            try {
                await updateShipmentStatusApi(id, statusMap[newStatus] ?? "Pending");
                setAllShipments((prev) =>
                    prev.map((s) =>
                        s.id === id ? { ...s, status: newStatus as Shipment["status"] } : s
                    )
                );
                showToast(
                    `Shipment status updated to "${statusMap[newStatus]}" successfully!`,
                    "success"
                );
                if (existing?.trackingNumber) {
                    queryClient.invalidateQueries({ queryKey: ["tracking-details", existing.trackingNumber] });
                }
                queryClient.invalidateQueries({ queryKey: ["admin-status-counts"] });
                queryClient.invalidateQueries({ queryKey: ["my-status-counts"] });
                queryClient.invalidateQueries({ queryKey: ["recent-shipments"] });
                queryClient.invalidateQueries({ queryKey: ["top-customers"] });
            } catch (err: any) {
                showToast(
                    err?.response?.data?.message ?? "Failed to update status.",
                    "error"
                );
            }
        },
        [allShipments, showToast, queryClient]
    );

    // ─── Clipboard helpers ────────────────────────────────────────────
    const handleCopy = useCallback((e: React.MouseEvent, trackingNum: string) => {
        e.stopPropagation();
        const copy = () => {
            setCopiedId(trackingNum);
            setTimeout(() => setCopiedId(null), 1500);
        };

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(trackingNum).then(copy).catch(fallbackCopy);
        } else {
            fallbackCopy(trackingNum);
        }

        function fallbackCopy(num: string = trackingNum) {
            try {
                const ta = document.createElement("textarea");
                Object.assign(ta.style, {
                    position: "fixed", top: "0", left: "0",
                    width: "2em", height: "2em", padding: "0",
                    border: "none", outline: "none",
                    boxShadow: "none", background: "transparent",
                });
                ta.value = num;
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                if (document.execCommand("copy")) copy();
                document.body.removeChild(ta);
            } catch (err) {
                console.error("Clipboard fallback failed", err);
            }
        }
    }, []);

    return {
        /** All shipments after client-side filtering (used for counts). */
        shipments: filteredShipments,
        /** Only the records for the current page. */
        paginatedShipments,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        startDate,
        endDate,
        onStartDateChange: setStartDate,
        onEndDateChange: setEndDate,
        onClearDates: () => { setStartDate(""); setEndDate(""); },
        copiedId,
        handleCopy,
        currentPage,
        setCurrentPage,
        totalPages,
        startIndex,
        endIndex,
        handleUpdateStatus,
        refreshShipments: fetchShipments,
    };
};

export default useAdminShipments;