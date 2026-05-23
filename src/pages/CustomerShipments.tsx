import React, {
    useState,
} from "react";

import {
    AlertCircle,
    RefreshCw,
} from "lucide-react";

import {
    CustomerShipmentsTable,
    TrackingModal,
} from "../components/ui";

import { useCustomerShipments } from "../hooks/useCustomerShipments";

export const CustomerShipments: React.FC =
    () => {
        const {
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
            refreshShipments,
            shipments,
        } = useCustomerShipments();

        const [
            selectedTrackingNumber,
            setSelectedTrackingNumber,
        ] = useState<
            string | null
        >(null);

        const handleTrackShipment =
            (
                trackingNumber: string
            ) => {
                setSelectedTrackingNumber(
                    trackingNumber
                );
            };

        const handleCloseModal =
            () => {
                setSelectedTrackingNumber(
                    null
                );
            };

        return (
            <div className="flex flex-col gap-6 w-full p-1 md:p-2 animate-fade-in">

                {error && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 rounded-2xl shadow-[0_4px_12px_rgba(239,68,68,0.05)]">

                        <div className="flex items-center gap-3">

                            <div className="p-2 rounded-lg border border-red-500/15 bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>

                            <div className="flex flex-col gap-0.5">

                                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                    Failed to Load Shipments
                                </span>

                                <span className="text-xs font-medium leading-relaxed text-[var(--color-text-muted)]">
                                    {error}
                                </span>

                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={
                                refreshShipments
                            }
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-600 dark:text-red-400 transition-all duration-200 cursor-pointer shrink-0"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />

                            Retry
                        </button>

                    </div>
                )}

                <CustomerShipmentsTable
                    paginatedShipments={paginatedShipments}
                    isLoading={loading}
                    onTrackShipment={handleTrackShipment}
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
                />

                <TrackingModal
                    isOpen={
                        Boolean(
                            selectedTrackingNumber
                        )
                    }
                    onClose={
                        handleCloseModal
                    }
                    trackingNumber={
                        selectedTrackingNumber
                    }
                />

            </div>
        );
    };

export default CustomerShipments;